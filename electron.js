/* jshint node: true */
'use strict';

const electron         = require('electron');
const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;
const childProcess     = require('child_process');
const path             = require('path');
const fs               = require('fs');

let mainWindow = null;

electron.crashReporter.start();

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    delete mainWindow.module;

    // If you want to open up dev tools programmatically, call
    mainWindow.openDevTools();

    // By default, we'll open the Ember App by directly going to the
    // file system.
    //
    // Please ensure that you have set the locationType option in the
    // config/environment.js file to 'hash'. For more information,
    // please consult the ember-electron readme.
    mainWindow.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point
    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

var killByPID = function(path) {
  try {
    var pid = fs.readFileSync(path, 'utf8');
    pid = parseInt(pid);
    console.log(`Attempting to kill existing server process ${pid}`);
    process.kill(pid, 'SIGTERM');
  } catch (e) {
    console.log(`exception ${e}`);
    console.log('Exception or no existing server PID.  Continuing.');
  }
}

electron.ipcMain.on('startProcedureServer', (event, dir) => {
  killByPID('server.pid');

  var serverFile = path.join(`${__dirname}`, 'public', 'procedures', dir, "procedure.py");
  var serverProcess = childProcess.spawn("python", [serverFile]);
  fs.writeFile('server.pid', serverProcess.pid);

  serverProcess.stdout.on('data', (data) => {
    // console.log(data);
  });

  serverProcess.stderr.on('data', (data) => {
    console.log(`error: ${data}`);
    if (data.indexOf('STARTED') >= 0) {
      event.returnValue = true;
    }
  });

  serverProcess.on('error', (err) => {
    console.log(`Procedure server error ${err}`);
  })

  serverProcess.on('close', (code) => {
    console.log(`Procedure server process exited with code ${code}`);
    killByPID('server.pid');
  });
});
