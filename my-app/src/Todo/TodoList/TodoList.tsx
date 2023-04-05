import React from "react";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import { TodoType } from "../../App";

type Todos = {
  todos:TodoType[],
  onDelete:(id:number) => void,
  onChangeFlag:(id:number) => void,
  onChangeTodo:(todo:TodoType) => void
}

function TodoList(props:Todos) {
  return(
    <ul className={styles.ul}>
      {props.todos.map((todo:TodoType) => {
        return <TodoItem 
        value={todo.name} 
        key={todo.id}
        todo={todo} 
        onDelete={props.onDelete}
        onChangeFlag={props.onChangeFlag}
        onChangeTodo={props.onChangeTodo}
        />
      })}
    </ul>
  )
}

export default TodoList;
