import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "../redux/actions";

const Todo = ({todo}) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.data);

    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault();

        setEditing(prevstate => !prevstate);

        dispatch(updateTodo(todo._id, text))
    }

    return(
        <li 
        className="task"
        onClick={() => {
            dispatch(toggleTodo(todo._id))
        }}
        style={{
            textDecoration: todo.done ? 'line-through' : '',
            color: todo.done ? '#bdc37' : '#34495e'
        }}
        >
            <span style={{display: editing ? 'none' : ''}}>{todo.data}</span>

            <form 
            style={{ display: editing? 'inline' : 'none'}}
            onSubmit={onFormSubmit}
            >
                <input 
                type="text"
                value={text}
                className='edit-todo'
                onChange={(e)=>{
                    setText(e.target.value)
                }}
                />
            </form>

            <span className="icon" onClick={()=> dispatch(deleteTodo(todo._id))}>
                <i className="fas fa-trash"></i>
            </span>
            <span className="icon" onClick={()=>{
                setEditing(prevstate => !prevstate)
            }}>
                <i className="fas fa-pen"></i>
            </span>
        </li>
    )
}

export default Todo;