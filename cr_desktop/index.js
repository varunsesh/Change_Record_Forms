const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

const createWindow = () => {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      });
      mainWindow = new BrowserWindow({ width: 800, height: 600 });
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