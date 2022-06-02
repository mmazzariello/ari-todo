import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, { useState, useCallback } from "react";

import "./App.css";

function Home() {
  const [todoDone, setTodoDone] = useState(false);
  const [todoText, setTodoText] = useState("");

  // const handleAddTodo = useCallback(() => {
  //   console.log("add");
  // });

  const handleIsChecked = useCallback((checked) => {
    setTodoDone(checked);
    console.log("vercheck", checked);
  }, []);

  const handleTextChange = (content) => {
    setTodoText(content);
    console.log("todo content", content);
  };

  return (
    <div className="App" style={{ width: "100%", display: "flex", flexDirection: "column", margin: "0 30px" }}>
      <h1>Ari-Todos</h1>
      <button style={{ width: "30px" }}>+</button>
      <Todo todoDone={todoDone} isChecked={handleIsChecked} todoText={todoText} isContent={handleTextChange} />
    </div>
  );
}

export default Home;

const Todo = ({ isChecked, todoDone, isContent, todoText }) => {
  return (
    <div>
      <div style={{ height: "30px", width: "400px", textAlign: "left" }}>
        <input
          type="checkbox"
          checked={todoDone}
          onChange={(event) => {
            isChecked(event.target.checked);
          }}
        />
        <input type="text" value={todoText} onChange={(event) => isContent(event.target.value)}></input>
      </div>
    </div>
  );
};
