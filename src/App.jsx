import React, { useState, useEffect } from "react";
import { generalStyle } from "./styles";
import { Plus } from "lucide-react";
import Modal from "./components/Modal.jsx";
import Task from "./components/Task.jsx";

export default function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [indexTask, setIndexTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const initialTasks = await app.getAllTasks();
        if (Array.isArray(initialTasks)) {
          setTasks(initialTasks);
        }
      } catch (error) {
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        console.error("Error fetching tasks in useEffect:", error);
      }
    };
  
    fetchTasks();
  }, []);
  // Handle show/hide modal
  const visibleModalHandler = () =>
    setVisibleModal(!visibleModal);

  //  ============== Create a new task ==============
  const createTask = (task) => {
    // 1) Add new task into tasks array
    // setTasks([...tasks, task]);
    setTasks((prevTasks) => [...prevTasks, task]);


    // 1) use createTask method from preload.js
    app.createTask(task);
    // app.getAllTasks(setTasks);

    // 2) Close modal
    visibleModalHandler();
  };

  const showModalForEdit = (index) => {
    // 1) Open modal
    visibleModalHandler();

    // 2) Update indexTask pour signaler qu'il y a une mise a jour
    setIndexTask(index);
  };

  const updateTask = (textEntered) => {
    // 1) Copy task array
    const copyTask = [...tasks];

    // 2) Update task using the index
    copyTask[indexTask] = textEntered;

    // 3) Update with copy
    setTasks(copyTask);

    app.updateTask(indexTask, textEntered);
    // app.getAllTasks(setTasks);
    // 4) Close modal
    visibleModalHandler();
  };

  const deleteTask = (index) => {
    // 1) copy task array
    const copyTask = [...tasks];
    // 2) Remove task using splice method
    copyTask.splice(index, 1);
    // 3) update tasks array
    setTasks(copyTask);

    app.deleteTask(index);
    // app.getAllTasks(setTasks);
  };

  // If modal is visible return Modal Component
  if (visibleModal)
    return (
      <Modal
        onClose={visibleModalHandler}
        createTask={createTask}
        updateTask={updateTask}
        indexTask={indexTask}
      />
    );

  return (
    <div className={generalStyle.mainBackground}>
      <div className={generalStyle.container}>
        <header className={generalStyle.header.container}>
          <h1 className={generalStyle.header.title}>
            Todo App
          </h1>

          <div
            onClick={visibleModalHandler}
            className={generalStyle.header.icon}
          >
            <Plus />
          </div>
        </header>

        {/* MAIN */}
        <main>
  {tasks && tasks.length === 0
    ? "No tasks 🥲"
    : tasks && tasks.map((item, index) => (
        <Task
          key={index}
          name={item}
          visibleModalHandler={showModalForEdit}
          deleteTask={deleteTask}
          index={index}
        ></Task>
      ))}
</main>

      </div>
    </div>
  );
}
