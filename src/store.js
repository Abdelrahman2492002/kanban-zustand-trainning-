import { create } from "zustand";

const store = (set) => ({
  draggedTask: null,
  tasks: [{ title: "TestTask", state: "ONGOING" }],
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({ tasks: store.tasks.filter((t) => t.title !== title) })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

export const useStore = create(store);
