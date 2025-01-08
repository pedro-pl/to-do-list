import styles from "./FrameTask.module.css";
import clipboard from "../assets/Clipboard.png";
import { CardTask } from "./CardTask";
import { useState } from "react";

interface TaskProps {
    id:number,
    text: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: TaskProps[],
    onDeleteTask: (id: number) => void;
}

export function FrameTask ({tasks, onDeleteTask}: TaskListProps){
    const [tasksFinished, setTasksFinished] = useState<number[]>([]);

    function ChangeTasksFinished (id: number){
        setTasksFinished((state) => [...state, id])
    }

    function RemoveRepeatedTask(id: number){
        const tasksFinishedWithoutDeleteOne = tasksFinished.filter((task) => task !== id)
        setTasksFinished(tasksFinishedWithoutDeleteOne);
    }

    function DeleteTask(id: number){
        RemoveRepeatedTask(id);
        onDeleteTask(id);
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas criadas <span>{tasks.length}</span></p>
                </div>

                <div>
                    <p>Concluídas <span>{tasksFinished.length} de {tasks.length}</span></p>
                </div>
            </header>

            <article className={styles.containerTasks}>
                {tasks.length === 0 ? (
                    <div className={styles.frameEmpty}>
                        <img src={clipboard} />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <div key={index} className={styles.tasks}>
                            <CardTask 
                                text={task.text} 
                                id={task.id} 
                                completed={task.completed}
                                onDeleteTask={DeleteTask}
                                onChangeTasksFinished={ChangeTasksFinished}
                                onRemoveRepeatedTask={RemoveRepeatedTask}
                            />
                        </div>
                    ))
                )}
            </article>
        </div>
    )
}