const { app, BrowserWindow } = require('electron')
const path = require('path');
const { start } = require('repl');
const url = require('url');
const isDev = app.isPackaged ? false : require('electron-is-dev');

const createWindow = () => {
    const startUrl =  isDev ? process.env.ELECTRON_START_URL : 
                              `file://${path.join(__dirname, "./build/index.html")}`;
      mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        webPreferences: {
          webSecurity: false // Enable loading of local resources via file://
        } });
      console.log(startUrl);
      console.log(`file://${path.join(__dirname, "./build/index.html")}`);

      mainWindow.loadURL(startUrl);
      mainWindow.on('closed', function () {
        mainWindow = null;
      });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})