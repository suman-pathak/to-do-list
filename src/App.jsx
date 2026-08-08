import Header from "./Components/Header";
import Board from "./Components/Board";

import "./App.css";
import Modal from "./Components/ui/Modal";

function App() {
  return (
    <div className="app">
      <Header />
      <Board />
      <Modal />
    </div>
  );
}

export default App;
