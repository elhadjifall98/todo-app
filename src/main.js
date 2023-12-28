const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");

// ============== Create a store with tasks initial value empty array ==============
const store = new Store({ tasks: [] });

let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Reassign null value to mainWindow when window closed
  mainWindow.on("closed", () => (mainWindow = null));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// Create window when app is ready
app.on("ready", createWindow);

const key = "tasks";

// ==============  Get All Task ==============
ipcMain.handle("tasks:get", () => {
  // 1) Get All tasks from electron store
  const allTasks = store.get(key);

  /*  mainWindow.webContents.send(
    "tasks:receiveAllTask",
    allTasks
  );

  */

  return allTasks;
});

// ==============  Create Task ==============
ipcMain.on("tasks:add", (event, task) => {
  // 1) Get All tasks from electron store
  const allTasks = store.get(key);

  // 2) Add new task into the store
  const newTasks = [...allTasks, task];

  // 3) Send to electron store
  store.set(key, newTasks);
});

// ==============  Update Task ==============
// value = {index, taskEdited} in preload.js
ipcMain.on("tasks:update", (event, value) => {
  // 1) Get All tasks from electron store
  const allTasks = store.get(key);

  // 2) Update the task
  allTasks[value.index] = value.taskEdited;

  // 3) Save change
  store.set(key, allTasks);
});

// ==============  Delete Task ==============
ipcMain.on("tasks:delete", (event, index) => {
  // 1) Get All tasks from electron store
  const allTasks = store.get(key);

  const filter = allTasks.filter(
    (item, indexFilter) => indexFilter !== index
  );

  store.set(key, filter);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
