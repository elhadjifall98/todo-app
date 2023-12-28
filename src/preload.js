const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  /*  getAllTasks: (setTasks) => {
    ipcRenderer.send("tasks:get");

    ipcRenderer.on(
      "tasks:receiveAllTask",
      (event, allTasks) => setTasks(allTasks)
    );
  },
  */
  // Invoke (preload)/handle (main process)
// Dans preload.js
getAllTasks: async () => {
  try {
    const allTasks = await ipcRenderer.invoke("tasks:get");
    return allTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rejeter l'erreur pour qu'elle soit traitée dans le composant React
  }
},

  
  createTask: (task) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("tasks:add", task);
      ipcRenderer.once("tasks:added", (event, newTask) => {
        resolve(newTask);
      });
      ipcRenderer.once("tasks:addError", (event, error) => {
        reject(error);
      });
    });
  },
  
  updateTask: (index, taskEdited) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("tasks:update", { index, taskEdited });
      ipcRenderer.once("tasks:updated", (event, updatedTask) => {
        resolve(updatedTask);
      });
      ipcRenderer.once("tasks:updateError", (event, error) => {
        reject(error);
      });
    });
  },
  
  deleteTask: (index) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("tasks:delete", index);
      ipcRenderer.once("tasks:deleted", (event, deletedTask) => {
        resolve(deletedTask);
      });
      ipcRenderer.once("tasks:deleteError", (event, error) => {
        reject(error);
      });
    });
  },
  
});
