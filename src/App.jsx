import "./App.css";
import MainList from "./Components/MainList";
// import { v4 as uuidv4 } from "uuid";
import TodoContext from "./Contexts/TodoContext";
import { useState } from "react";
// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "مهمة 1",
//     details: "تفاصيل المهمة 1",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "مهمة 2",
//     details: "تفاصيل المهمة 2",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "مهمة 3",
//     details: "تفاصيل المهمة 3",
//     isCompleted: false,
//   },
// ];

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div
      style={{
        margin: "50px 0",
      }}
    >
      <TodoContext.Provider value={{ todos, setTodos }}>
        <MainList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
