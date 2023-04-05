import React from "react";
import { TodoType } from "../../App";
import styles from "./TodoItem.module.scss"

type TodoItemType = {
  value: string,
  todo:TodoType,
  onDelete:(id:number) => void,
  onChangeFlag:(id:number) => void,
  onChangeTodo:(todo:TodoType) => void
}

function TodoItem(props:TodoItemType) {
  return(
    <li className={styles.li}>
      <span>{props.value}</span>
      <button className={styles.btn} onClick={() => props.onDelete(props.todo.id)}>Delete</button>
      <button className={styles.btn} onClick={() => {props.onChangeTodo(props.todo)}}>Correct</button>
    </li>
  )
}

export default TodoItem;
