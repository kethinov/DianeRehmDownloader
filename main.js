var ipc = require('ipc'),
    app = require('app'),
    electronWindow = require('browser-window'),
    dialog = require('dialog'),
    mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new electronWindow({width: 600, height: 900, icon: 'images/appicon.png'});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  
  ipc.on('saveEpisode', function(event, data) {
    var response = dialog.showOpenDialog({properties: ['openDirectory'], title: 'Select folder to save episode to...'});
    event.returnValue = response || 'abort';
  });

  ipc.on('openListenWindow', function(event, data) {
    var listenWindow = new electronWindow({width: 320, height: 100, title: 'The Diane Rehm Show - ' + data.epTitle});
    listenWindow.loadUrl(data.href);
    listenWindow.on('closed', function() {
      listenWindow = null;
    });
  });
});