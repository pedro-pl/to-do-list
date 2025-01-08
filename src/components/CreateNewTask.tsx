import { ChangeEvent, useState } from "react";
import styles from "./CreateNewTask.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";

interface Task {
    id: number;
    text: string;
    isChecked: boolean;
}

export function CreateNewTask(){
    const [tasks, setTasks] = useState<Task[]>([])
    

    return(
        
    )
}