import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todo/todoSlice';
import { updateTodo } from '../features/todo/todoSlice';
export default function Todo(){
   const todos = useSelector((state) => state.todos);
   console.log(todos);
    const dispatch = useDispatch();

    const clickHandler = (id) => {
      dispatch(deleteTodo(id));
    }

    const click = (id) => {
        dispatch(updateTodo(id));
    }
    return (
        <>
              <h2> Todo </h2>
              <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task}
                    <button onClick={() => clickHandler(todo.id)}>Delete</button>
                    <button onClick={() => click(todo.id)}>markAsDone</button>
                    </li>
                ))}
              </ul>
        </>
      
    );
}