import { useState, useEffect } from "react";
import Header from "./Components/Header";
import TodoForm from "./Components/TodoForm";
import List from "./Components/List";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: newText,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const remainingTasks = totalTasks - completedTasks;


  return (
    <div className="app">
      <Header />
      <TodoForm addTodo={addTodo} />

      <div className="filters">
        <button
          className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="task-counter">
        <p>Total: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Remaining: {remainingTasks}</p>
      </div>

      {completedTasks > 0 && (
        <button
          className="clear-btn"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      )}

      <List
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        filter={filter}
        search={search}
      />
    </div>
  );
}

export default App;