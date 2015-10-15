var FeedParser = require('feedparser'),
    http = require('http'),
    request = require('request'),
    feedparser = new FeedParser(),
    ipc = require('ipc'),
    fs = require('fs'),
    clones = [];

request.get('http://feeds.wamu.org/WAMU885DianeRehm')
.on('error', function (error) {
  alert('Error getting Diane Rehm feed.');
})
.on('response', function (res) {
  var stream = this;

  if (res.statusCode !== 200) {
    return this.emit('error', new Error('Bad status code'));
  }

  stream.pipe(feedparser);
});

feedparser.on('error', function(error) {
  alert('Error parsing Diane Rehm feed.');
});

feedparser.on('readable', function() {
  var stream = this,
      meta = this.meta,
      item,
      template = document.getElementsByTagName('template')[0],
      content = template.innerHTML,
      hour,
      day,
      month,
      year;

  while (item = stream.read()) {
    hour = ''+item.date.getHours();
    hour = parseInt(hour.length > 1 ? hour : '0' + hour);
    day = ''+item.date.getUTCDate();
    day = day.length > 1 ? day : '0' + day;
    month = ''+(item.date.getMonth() + 1);
    month = month.length > 1 ? month : '0' + month;
    year = ''+item.date.getFullYear();
    year = year.substring(2);
    clones.push({
      content: content
        .replace(/{title}/g, item.title)
        .replace('{desc}', item.description)
        .replace('{filename}', (year+month+day+(hour === 10 ? 1 : 2)+'_'+item.title).replace(/[^a-z0-9]/gi, '_') + '.mp3')
        .replace('{download}', 'http://downloads.wamu.org/mp3/dr/'+year+'/'+month+'/r'+(hour === 10 ? 1 : 2)+year+month+day+'.mp3'),
      hour: hour
    }); 
  }
});

feedparser.on('end', function() {
  var hour = 0,
      lastHour = 0,
      segments = 1,
      totalHTML = '',
      cloneStrings = [];
  
  clones.forEach(function(cloneObj) {
    var clone = cloneObj.content,
        hour = cloneObj.hour;

    console.log(hour);
    if (lastHour === hour) {
      clone = clone.replace(/\.mp3/g, '-'+segments+'.mp3');
      console.log(clone);
      if (segments === 1) {
        segments++;
        cloneStrings[cloneStrings.length - 1] = cloneStrings[cloneStrings.length - 1].replace(/\.mp3/g, '-'+segments+'.mp3');
        console.log(cloneStrings[cloneStrings.length - 1]);
      }
    }
    else {
      segments = 1;
    }

    lastHour = hour;
    cloneStrings.push(clone);
  });

  document.body.insertAdjacentHTML('beforeEnd', cloneStrings.join(''));
  document.getElementById('loading').setAttribute('hidden', 'hidden');
});
  
window.addEventListener('click', function(e) {
  var el = e.target,
      req,
      epTitle,
      fileName,
      destination,
      contentLength = 0,
      chunksSoFar = 0,
      percentComplete = 0,
      listenWindow;

  if (el.nodeName === 'A') {
    if (el.target === '_self') {
      return;
    }

    e.preventDefault();
    epTitle = el.getAttribute('data-title');
    fileName = el.getAttribute('data-filename');
    
    if (el.target === '_blank') {
      
      // listen to it
      ipc.sendSync('openListenWindow', {
        epTitle: epTitle,
        href: el.href
      });
    }
    else {

      // download it
      req = http.request(
        {
          method: 'HEAD',
          host: 'downloads.wamu.org',
          port: 80,
          path: el.href.replace('http://downloads.wamu.org', '')
        },
        function(res) {
          if (res.statusCode === 404) {
            alert('Not posted yet.');
          }
          else {
            destination = ipc.sendSync('saveEpisode', {
              fileName: fileName
            });

            if (destination !== 'abort') {
              request.get(el.href)
              .on('error', function(err) {
                alert('Not posted yet.');
              })
              .on('response', function (res) {
                var interval,
                    percentElement = document.createElement('progress');

                if (res.statusCode === 200) {
                  interval = setInterval(function() {
                    var done;
                    percentElement.setAttribute('value', percentComplete);
                    if (percentComplete >= 100) {
                      clearInterval(interval);
                      done = document.createElement('a');
                      done.href = destination + '/' + fileName;
                      done.target = '_blank';
                      done.setAttribute('data-title', epTitle);
                      done.appendChild(document.createTextNode('Listen'));
                      percentElement.parentNode.replaceChild(done, percentElement);
                    }
                  }, 100);

                  contentLength = res.headers['content-length'];
                  percentComplete = Math.round((chunksSoFar / contentLength) * 100);
                  percentElement.setAttribute('value', percentComplete);
                  percentElement.setAttribute('max', '100');
                  el.parentNode.replaceChild(percentElement, el);
                }
                else {
                  return this.emit('error', new Error('Bad status code'));
                }
              })
              .on('data', function(chunk) {
                chunksSoFar += chunk.length;
                percentComplete = Math.round((chunksSoFar / contentLength) * 100);
              })
              .pipe(fs.createWriteStream(destination + '/' + fileName));
            }
          }
        }
      );
      req.end();
    }
  }
}, true);