import { useState } from "react";
import "./App.css";
import Field from "./components/Field";
import Menu from "./components/Menu";

function App() {
  const [onMouseClick, setOnMouseClick] = useState(false);
  const [onMousePush, setOnMousePush] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [restart, setRestart] = useState(false);

  return (
    <div className="app">
      <div className="app__content">
        <Menu
          onMouseClick={onMouseClick}
          setOnMouseClick={setOnMouseClick}
          onMousePush={onMousePush}
          isLose={isLose}
          setIsLose={setIsLose}
          isWon={isWon}
          setIsWon={setIsWon}
          restart={restart}
          setRestart={setRestart}
        />
        <Field
          onMouseClick={onMouseClick}
          setOnMouseClick={setOnMouseClick}
          onMousePush={onMousePush}
          setOnMousePush={setOnMousePush}
          restart={restart}
          setRestart={setRestart}
          isLose={isLose}
          setIsLose={setIsLose}
          isWon={isWon}
          setIsWon={setIsWon}
        />
      </div>
    </div>
  );
}

export default App;
