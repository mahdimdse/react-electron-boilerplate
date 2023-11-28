/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL || `file://${__dirname}/../build/index.html`;

  mainWindow = new BrowserWindow({
    resizable: false,
    width: 900,
    height: 600,
    icon: __dirname + "/favicon.ico",
    webPreferences: {
      backgroundThrottling: false,
      // nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  process.env.ELECTRON_START_URL && mainWindow.webContents.openDevTools();

  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.exit();
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0 || mainWindow === null) {
    createWindow();
  } else {
    app.relaunch();
  }
});

app.whenReady().then(() => {
  ipcMain.on("triggerNotification", (event, message) => {
    const NOTIFICATION_TITLE = "Notification";
    const NOTIFICATION_BODY = message;
    new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY,
    }).show();
  });
});
