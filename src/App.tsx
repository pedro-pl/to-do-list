import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { FrameTask } from './components/FrameTask'
import { Header } from './components/Header'
import styles from "./App.module.css"
import './global.css'
import { IoMdAddCircleOutline } from 'react-icons/io';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState("")

  const isNewTaskTextEmpty = newTaskText.length === 0;

  function handleCreateNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity("")
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function handleCreateNewTask (event: FormEvent){
      event.preventDefault();
      const id= new Date().getTime()

      const newTask = {
          id,
          text: newTaskText,
          completed: false
      }

      console.log(newTask)

      setTasks((state) => [...state, newTask])
      setNewTaskText("");
  }

  function deleteTask (idToDelete: number){
    const tasksWithoutDeleteOne = tasks.filter((task) => task.id !== idToDelete)
    setTasks(tasksWithoutDeleteOne)
  }
  
  return (
    <div>
      <Header/>
      <form onSubmit={handleCreateNewTask} className={styles["new-task"]}>
        <textarea 
          placeholder="Adicione uma nova tarefa" 
          onChange={handleCreateNewTaskChange}
          required 
          onInvalid={handleNewTaskInvalid}
          value={newTaskText}
        />
        <button type='submit' disabled={isNewTaskTextEmpty}>
          Criar <IoMdAddCircleOutline size={20}/>
        </button>
      </form>
      <FrameTask tasks={tasks} onDeleteTask={deleteTask}/>
    </div>
  )
}

export default App
