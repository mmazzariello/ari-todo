import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function Home({ ALLTODOS }) {
  // DB
  // [
  //   { id: , checked: false}
  //   { id: , checked: true}
  // ]
  const [allTodos, setAllTodos] = useState([]);
  console.log("::", allTodos);

  const handleAddTodo = useCallback(() => {
    const todoToAdd = {
      id: uuidv4(),
      content: "",
      isChecked: false,
    };

    setAllTodos(allTodos.concat(todoToAdd));
  }, [allTodos]);

  const handleIsChecked = useCallback(
    (id, checked) => {
      const todo = allTodos.find((todo) => todo.id === id);
      if (todo) {
        todo.isChecked = checked;
      }
      setAllTodos([...allTodos]);
      // console.log("vercheck", checked);
    },
    [allTodos]
  );

  const handleTextChange = (id, content) => {
    const todo = allTodos.find((todo) => todo.id === id);
    if (todo) {
      todo.content = content;
    }
    setAllTodos([...allTodos]);
    console.log("todo content", content);
  };

  return (
    <div
      className="App"
      style={{ width: "100%", display: "flex", flexDirection: "column", margin: "0 30px", height: "100%" }}
    >
      <h1>Ari-Todos</h1>
      <button onClick={handleAddTodo} style={{ width: "30px" }}>
        +
      </button>
      <AllTodos allTodos={allTodos} onCheck={handleIsChecked} onTextChange={handleTextChange} />
    </div>
  );
}

const AllTodos = ({ allTodos, onCheck, onTextChange }) => {
  //Hacer el push al array

  return (
    <div style={{ height: "100%" }}>
      {Object.values(allTodos).map((todo) => {
        return <Todo todo={todo} onCheck={onCheck} onTextChange={onTextChange} key={todo.id} />;
      })}
    </div>
  );
};

const Todo = ({ todo, onCheck, onTextChange }) => {
  return (
    <div>
      <div style={{ height: "30px", width: "400px", textAlign: "left", opacity: todo.isChecked ? 0.3 : 1 }}>
        <input
          type="checkbox"
          checked={todo.isChecked}
          onChange={(event) => {
            onCheck(todo.id, event.target.checked);
          }}
        />
        <input
          type="text"
          value={todo.content}
          onChange={(event) => {
            onTextChange(todo.id, event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

const ALLTODOS = [{ id: "1", content: "contenido", isChecked: false }];

function AppBis() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Home allTodos={ALLTODOS} />
    </div>
  );
}

export default AppBis;
