// rfc
import React, { useState } from "react";
import { generalStyle, modalStyle } from "../styles";
import { X } from "lucide-react";

export default function Modal(props) {
  const [textEntered, setTextEntered] = useState("");

  const onChangeHandler = (event) =>
    setTextEntered(event.target.value);

  // Submit button
  const submitHandler = (event) => {
    // Disable reload page
    event.preventDefault();

    props.createTask(textEntered);
  };

  const updateHandler = (event) => {
    // Disable reload page
    event.preventDefault();

    props.updateTask(textEntered)
  };

  // Falsy values : 0, null, undefined, "", false
  return (
    <div className={modalStyle.modalBackground}>
      <div className={modalStyle.container}>
        {/* CONTENT */}
        <div className={modalStyle.wrapMainContent}>
          <button
            type="button"
            onClick={props.onClose}
            className={modalStyle.closeButton}
          >
            <X />
          </button>

          <div className={modalStyle.content.container}>
            <h2 className={modalStyle.content.title}>
              {props.indexTask !== null
                ? "Update "
                : "Create "}
              Task
            </h2>

            <form className={modalStyle.content.form}>
              <div>
                <label
                  htmlFor="task"
                  className={modalStyle.content.label}
                >
                  Your task
                </label>
                <input
                  onChange={onChangeHandler}
                  value={textEntered}
                  placeholder="Enter your task"
                  type="text"
                  name="task"
                  id="task"
                  className={modalStyle.content.input}
                  required
                  autoFocus
                />
              </div>

              <button
                onClick={
                  props.indexTask !== null
                    ? updateHandler
                    : submitHandler
                }
                type="submit"
                disabled={!textEntered}
                className={`${
                  textEntered
                    ? generalStyle.button
                    : `${generalStyle.button} cursor-not-allowed`
                }`}
              >
                Create New Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
