import { useState } from "react";
import styles from "./CardTask.module.css"
import { IoCheckmark } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";

interface TaskProps {
    id:number,
    text: string;
    completed: boolean;
    onDeleteTask: (id:number) => void;
    onChangeTasksFinished: (id: number) => void;
    onRemoveRepeatedTask: (id: number) => void;
}

export function CardTask ({text, id, onDeleteTask, onChangeTasksFinished, onRemoveRepeatedTask}: TaskProps){
    const [isChecked, setIsChecked] = useState(false)

    const changeStyleCheckbox = isChecked ? styles["checkbox-checked"] : styles["checkbox-unchecked"]
    const changeStyleText = isChecked ? styles["task-text-checked"] : styles["task-text-unchecked"]

    function handleCheck(id: number){
        setIsChecked(!isChecked)

        if(isChecked){
            onRemoveRepeatedTask(id)
        }else{
            onChangeTasksFinished(id)
        }
    }
    
    function DeleteTask(id: number){
        onDeleteTask(id);
    }

    return (
        <div className={styles.card}>
            <div className={styles.taskInfo}>
                <input readOnly type="checkbox"/>
                <span 
                    className={`${styles.checkbox} ${changeStyleCheckbox}`} onClick={() => handleCheck(id)}
                >
                    <IoCheckmark size={14}/> 
                </span>
                <p className={`${styles.taskText} ${changeStyleText}`}>{text}</p>
            </div>

            <button className={styles.delete} onClick={() => DeleteTask(id)}>
                <LuTrash2 className={styles.trash} size={20}/>
            </button>
        </div>
    )
}