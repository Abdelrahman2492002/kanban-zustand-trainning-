import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store.js";
import { useMemo } from "react";
import trash from "../assets/trash.svg";

const Task = ({ title }) => {
  const tasks = useStore((store) => store.tasks);
  const task = useMemo(
    () => tasks.find((task) => task.title === title),
    [tasks, title]
  );
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      {task.title}
      <div className="bottomWrapper">
        <div onClick={() => deleteTask(task.title)}>
          <img src={trash} alt="trash icon" />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

export default Task;
