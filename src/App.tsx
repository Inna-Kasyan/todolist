import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
import { idText } from 'typescript';

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {



  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(t => t.id != id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(item => item.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone

      setTasks({ ...tasksObj })
    }


  }

  let todolistId1 = v1()
  let todolistId2 = v1()


  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to do', filter: 'all' }
  ])
  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
    ]
  })

  let removeTodolist = (todolistId: string) => {

    let fliteredTodolist = todolists.filter(item => item.id !== todolistId)
    setTodolists(fliteredTodolist)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  return (
    <div className="App">
      {
        todolists.map(item => {
          let tasksForTodolist = tasksObj[item.id];
          if (item.filter === 'completed') { tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true) }
          if (item.filter === 'active') { tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false) }

          return <Todolist removeTodolist={removeTodolist} key={item.id} id={item.id} changeTaskStatus={changeStatus} filter={item.filter} addTask={addTask} changeFilter={changeFilter} removeTask={removeTask} title={item.title} tasks={tasksForTodolist} />
        })
      }


    </div>
  );
}



export default App