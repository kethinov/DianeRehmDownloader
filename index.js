var FeedParser = require('feedparser'),
    http = require('http'),
    request = require('request'),
    feedparser = new FeedParser(),
    ipc = require('ipc'),
    fs = require('fs');

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
      clone,
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

    clone = content
      .replace(/{title}/g, item.title)
      .replace('{desc}', item.description)
      .replace('{filename}', (year+month+day+(hour === 10 ? 1 : 2)+'_'+item.title).replace(/[^a-z0-9]/gi, '_') + '.mp3')
      .replace('{download}', 'http://downloads.wamu.org/mp3/dr/'+year+'/'+month+'/r'+(hour === 10 ? 1 : 2)+year+month+day+'.mp3');

    document.body.insertAdjacentHTML('beforeEnd', clone);
    document.getElementById('loading').setAttribute('hidden', 'hidden');
  }
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