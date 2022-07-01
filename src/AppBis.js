import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ ALLTODOS }) => {
  const [allTodos, setAllTodos] = useState([]);

  const handleAddTodo = useCallback(() => {
    const todoToAdd = {
      id: uuidv4(),
      content: "",
      isChecked: false,
    };
    setAllTodos(allTodos.concat(todoToAdd));
    console.log("AddTodo", todoToAdd);
  }, [allTodos]);

  const handleTextChange = useCallback(
    (id, content) => {
      const todo = allTodos.find((todo) => todo.id === id);
      if (todo) {
        todo.content = content;
      }
      setAllTodos([...allTodos]);
      console.log("textChange", todo.content);
    },
    [allTodos]
  );

  const handleIsChecked = useCallback(
    (id, checked) => {
      const todo = allTodos.find((todo) => todo.id === id);
      if (todo) {
        todo.isChecked = checked;
      }
      setAllTodos([...allTodos]);
      console.log("isChecked", checked);
    },
    [allTodos]
  );

  return (
    <div>
      <h1>Ari-TodosBis</h1>
      <button onClick={handleAddTodo}>+</button>
      <AllTodos allTodos={allTodos} onTextChange={handleTextChange} onCheck={handleIsChecked} />
    </div>
  );
};

const AllTodos = ({ allTodos, onTextChange, onCheck }) => {
  return (
    <div>
      {Object.values(allTodos).map((todo) => {
        return <Todo todo={todo} onTextChange={onTextChange} onCheck={onCheck} key={todo.id} />;
      })}
    </div>
  );
};

const Todo = ({ todo, onTextChange, onCheck }) => {
  return (
    <div style={{ opacity: todo.isChecked ? 0.3 : 1 }}>
      <input type="checkbox" checked={todo.isChecked} onChange={(event) => onCheck(todo.id, event.target.checked)} />
      <input type="text" value={todo.content} onChange={(event) => onTextChange(todo.id, event.target.value)} />
    </div>
  );
};

const ALLTODOS = [{ id: "2", content: "", isChecked: false }];

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
      <Home allTodos={ALLTODOS}></Home>
    </div>
  );
}

export default AppBis;
