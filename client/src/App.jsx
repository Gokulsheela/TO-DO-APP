import ToDoApps from './ToDoApps'
function App() {

  return (
    <>
    <ToDoApps/>
    </>
  )
}

export default App



// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:3030/todos").then((res) => setTodos(res.data));
//   }, []);

//   const addTodo = async () => {
//     const res = await axios.post("http://localhost:3030/todos", { text });
//     setTodos([...todos, res.data]);
//     setText("");
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter todo"
//       />
//       <button onClick={addTodo}>Add</button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>{todo.task}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;