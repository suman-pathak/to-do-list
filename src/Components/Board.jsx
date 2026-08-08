import { useState } from "react";
import Modal from "./ui/Modal";

function Board() {
  const boards = [
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Completed" },
  ];

  const tasks = [
    { id: 1, titile: "Task 1", description: "test task", status: "to-do" },
    { id: 2, titile: "Task 2", description: "test task", status: "to-do" },
    { id: 3, titile: "Task 3", description: "test task", status: "to-do" },
  ];

  const handleSubmit = () => {
    return null;
  };

  const TaskForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" />
          </label>
          <label>
            Description
            <textarea type="text" />
          </label>
          <label>
            Status
            <options>
              {boards.map((status, index) => (
                <select key={index}>{status.title}</select>
              ))}
            </options>
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="board">
      {boards.map((board, index) => {
        return (
          <div className="kanban" key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <h2>{board.title}</h2>
              <button className="button" onClick={() => setIsOpen(true)}>
                <ion-icon name="add-outline"></ion-icon> Add
              </button>
            </div>
            <div className="kanban-list">
              {tasks.map((task, index) => {
                return (
                  <div className="task" key={index}>
                    <h3>{task.titile}</h3>
                    {task.description}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskForm />
      </Modal>
    </div>
  );
}

export default Board;
