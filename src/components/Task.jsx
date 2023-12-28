import React from "react";
import { generalStyle, taskStyle } from "../styles";
import { Pen, Trash } from "lucide-react";

export default function Task(props) {
  return (
    <div className={taskStyle.container}>
      <p className={taskStyle.task}>{props.name} </p>

      <div className={taskStyle.buttons.container}>
        {/* Edit button */}
        <button className={generalStyle.button}>
          <div
            className={taskStyle.buttons.wrapContent}
            onClick={() => props.visibleModalHandler(props.index)}
          >
            <Pen />
            <p>Update</p>
          </div>
        </button>

        {/* Delete button */}
        <button
          className={`${generalStyle.button} ${taskStyle.buttons.delete}`}
          onClick={() => props.deleteTask(props.index)}
        >
          <div className={taskStyle.buttons.wrapContent}>
            <Trash />
            <p>Delete</p>
          </div>
        </button>
      </div>
    </div>
  );
}
