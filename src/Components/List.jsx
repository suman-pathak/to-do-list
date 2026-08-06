import { useState } from "react";

const List = ({ todos, deleteTodo, toggleComplete, editTodo, filter, search }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "active") {
      return !todo.completed && matchesSearch;
    }

    if (filter === "completed") {
      return todo.completed && matchesSearch;
    }

    return matchesSearch;
  });

  console.log("editingId:", editingId);
  console.log("editText:", editText);

  const items = [];

  for (let i = 0; i < filteredTodos.length; i++) {
    items.push(
      <li key={filteredTodos[i].id}>
        <input
          type="checkbox"
          checked={filteredTodos[i].completed}
          onChange={() => toggleComplete(filteredTodos[i].id)}
        />

        {editingId === filteredTodos[i].id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span
            className={`todo-text ${filteredTodos[i].completed ? "completed" : ""}`}
          >
            {filteredTodos[i].text}
          </span>
        )}

        <button
          className="delete-btn"
          onClick={() => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this task?"
            );

            if (confirmDelete) {
              deleteTodo(filteredTodos[i].id);
            }
          }}
        >
          Delete
        </button>

        {editingId === filteredTodos[i].id ? (
          <button className="save-btn" onClick={() => {
            editTodo(filteredTodos[i].id, editText);
            setEditingId(null);
            setEditText("");
          }}>Save</button>
        ) : (
          <button className="edit-btn"
            onClick={() => {
              setEditingId(filteredTodos[i].id);
              setEditText(filteredTodos[i].text);
            }}
          >
            Edit
          </button>
        )}

      </li>
    );
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="no-todos">No todos found.</p>
      ) : (
        <ul>{items}</ul>
      )}
    </div>
  );
};

export default List;