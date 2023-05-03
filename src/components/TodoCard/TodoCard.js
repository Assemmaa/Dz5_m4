import React, { useState } from 'react'
import classes from './TodoCard.module.css'
const TodoCard = ({ task, handleDone, handleDelete, handleSelectEdit, isEdit, handleEdit}) => {
    /// '', null, false, undefined,0,
    const [ newTitle, setNewTitle ] = useState(task.title)
    
  const handleNewTitle = (title) => {
    console.log(title, 'tite');
    setNewTitle(title)
  }
    if(isEdit) {
      return <div>
        <input onChange={(event) => handleNewTitle(event.target.value)} value={newTitle} placeholder='edit' type="text" />
        <button onClick={() => handleEdit({...task, title: newTitle })}>Save</button>
      </div>
    } else {
      return  <div className={ task.completed ? `${classes.todoCard} ${classes.done}`: classes.todoCard }>
            <h3>{task.title}</h3>
            <button onClick={() => handleDone(task.id)}>Done</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleSelectEdit(task.id)}>Edit</button>
        </div>
      
    }
}

export default TodoCard