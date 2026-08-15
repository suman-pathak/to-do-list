import { useState } from "react";
import Modal from "./ui/Modal";

function Board() {
  const boards = [
    { id: 1, title: "To Do", status: "to-do" },
    { id: 2, title: "In Progress", status: "in-progress" },
    { id: 3, title: "Completed", status: "completed" },
  ];

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "test task",
      status: "to-do",
    },
    {
      id: 2,
      title: "Task 2",
      description: "test task",
      status: "to-do",
    },
    {
      id: 3,
      title: "Task 3",
      description: "test task",
      status: "to-do",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTask = {
      id: Date.now(),
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
    };

    const handleDelete = (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    e.target.reset();
    setIsOpen(false);
  };

  const TaskForm = () => {
    return (
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <label>
            Title <input type="text" name="title" />{" "}
          </label>
          <label>
            Description
            <textarea name="description" />
          </label>
          <label>
            Status
            <select name="status" defaultValue="to-do">
              {boards.map((board) => (
                <option key={board.id} value={board.status}>
                  {board.title}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  return (
    <div className="board">
      {boards.map((board) => {
        const boardTasks = tasks.filter((task) => task.status === board.status);
        return (
          <div className="kanban" key={board.id}>
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
                <ion-icon name="add-outline"></ion-icon>
                Add
              </button>

              {boardTasks.map((task) => (
                <div className="task" key={task.id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>

                  <div className="task-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTask(task);
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button type="button" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
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
