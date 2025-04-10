import { useStore } from "../store.js";
import "./Column.css";
import Task from "./Task";
import { useEffect, useMemo, useRef, useState } from "react";
const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);

  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (text) {
      addTask(text, state);
      setText("");
      setOpenModal(false);
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
      inputRef.current.focus();
    }
  }, [openModal]);

  return (
    <div
      className="column"
      onDrop={() => {
        console.log(draggedTask);
        setDraggedTask(null);
        moveTask(draggedTask, state);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpenModal(true)}>Add</button>
      </div>
      {filtered.map((task, index) => (
        <Task title={task.title} key={index} />
      ))}

      {openModal && (
        <div className="modal">
          <form className="modalContent">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
            />
            <button onClick={sumbitHandler}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Column;
