import Modal from './components/Modal/Modal';
import { useState, useEffect } from 'react';
import classes from './App.module.css'
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from './components/TodoCard/TodoCard';
function App() {

  const [ isShow, setIsShow ]  = useState(false)
  const [ newTask, setNewTask ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ currentEdit, setCurrentEdit ] = useState(null);

  const [ tasks, setTasks ] =  useState([]);
  const handleShow = () => setIsShow(!isShow)


  const handleAddTask = () => {

    if(newTask.length < 1 ) return

      setTasks((prevState) => [...prevState,
        {
          id: Date.now(),
          title: newTask,
          completed: false
        }
      ])
      setNewTask('')
      handleShow();
  } 

  const handleDone = (id) => {
   const newList = tasks.map(task => {
      if(task.id === id) {
        return {...task, completed: !task.completed }
      }else {
        return task
      }
    })
    setTasks([...newList])
  }

  const handleDelete = (id) => {
    const deletedLedList = tasks.filter(task => task.id !== id);
    setTasks([...deletedLedList])
  }
const handleSearch = (event) => {
  setSearch(event.target.value)
}

const handleEdit = (editTask) => {
  setCurrentEdit(null);
  const editList = tasks.map(task => {
    if(task.id === editTask.id) {
      return editTask
    }else {
      return task
    }
  })
  setTasks([...editList])
}


const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  const clearAll = () => {
    setTasks([])
    localStorage.clear()
  }


useEffect(() => {
  const myLocalTasks = JSON.parse(localStorage.getItem('taskList'));
  // if(myLocalTasks.length !== 0) {
  //   setTasks(myLocalTasks)
  //   }
}, [])

useEffect(() => {
  localStorage.setItem('taskList', JSON.stringify(tasks))
}, [ tasks ])



// console.log(currentEdit, 'current');

// const nameLocal = localStorage.getItem('name')
// const userLocal = localStorage.getItem('user')
// console.log(nameLocal, 'local name');
// console.log(JSON.parse(userLocal), 'userLocal');

/// примитивы string, number, boolean,
/// объекты obj, func, [],

// let str1 = 'syimyk';
// let str2 = 'Front-end';
// let str3 = str2;

// let obj = { /// ibraimova 101
//   name: 'fdsf',
//   position: 'Front'
// }


// let obj2 = obj; // ibraimova 101
// obj2.position  = 'Back'
// obj2.name = 'android'

// console.log(obj, 'obj1');
// console.log(obj2, 'obj2');

  // useEffect(() => {
  //   console.log('log');
  // }, [ isShow, tasks ])

  // console.log(isShow, 'isshow');
  return (
    <>
    <Container>
      <div className={classes.wrapper}>
      { isShow && <Modal handleAddTask={handleAddTask} setNewTask={setNewTask} handleShow={handleShow}  /> }
      <Button handleClick={handleShow}><p>Добавить</p></Button>
      <input name='search' placeholder='Поиск...' onChange={handleSearch} />
        <button onClick={clearAll}>Clear</button>
        {filteredTasks.map(task =>
      <TodoCard 
       handleDone={handleDone}
       handleDelete={handleDelete}
       handleSelectEdit={setCurrentEdit}
       handleEdit={handleEdit}
       isEdit={ currentEdit === task.id}
        key={task.id} 
        task={task} />)}
      </div>
    </Container>
    </>
  );
}

export default App;
