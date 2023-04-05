/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { TodoType } from '../App';
import styles from "./func.module.scss"

type FuncCreate = {
  onCreate:(value:string) => void
}

type FuncCorrect = {
  changedTodo:TodoType,
  onCorrect:(id:number, content:string) => void,
  setChangedTodo:(todo:TodoType) => void
}

export function CreateFieldForNewTodo(props:FuncCreate) {
  const [value, setValue] = useState<string>("")

  function submitHandler(event:React.FormEvent) {
    event.preventDefault();
    if(value!.trim()) {
        props.onCreate(value!);
        setValue("");
    }
  }  

  return (
    <form className={styles.form_add} onSubmit={submitHandler}>
      <input className={styles.input_add} type='text' value={value} onChange={(event) => {setValue(event.target.value)}}/>
      <button className={styles.btn} type="submit" >Add new todo</button>
    </form>
  )
}

export function CorrectTodo(props:FuncCorrect) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if(props.changedTodo.name !== '' && value === '') {
      setValue(props.changedTodo.name);
    } else {
      setValue('');
      props.setChangedTodo({
    id: 0,
    name: '',
    flagChange: false
      })
    } 
  }, [props.changedTodo.name])


  function submitHandler(event:React.FormEvent) {
    event.preventDefault();
    if(value!.trim()) {
      props.onCorrect(props.changedTodo.id, value!);
    } 
  }

  return (
    <form className={styles.form_save} onSubmit={submitHandler}>
      <input className={styles.input_save} type='text' value={value} onChange={(event) => {setValue(event.target.value)}}/>
      <button className={styles.btn} type="submit" >Save</button>
    </form>
  )
}

export function findAllTags(todo:string):String[] {  
  const re = /[#][_0-9A-ZА-ЯЁ]+/gi;
  const resultArr = todo.match(re) as String[];
  return resultArr;
}

export function addTagsFromNewTodo(id:number, name:string, todosTags:{ [key: string]: Number[] }, setTodosTags:React.Dispatch<React.SetStateAction<{
    [key: string]: Number[];
}>>) {
    const arrTags = findAllTags(name)? findAllTags(name) : [];
    const objectTodosTags = {...todosTags};
    const existedTags:String[] = [];
    const arrKeys:String[] = Object.keys(objectTodosTags);

    if(arrKeys.length) {
      for(let key of Object.keys(objectTodosTags)) {
        objectTodosTags[key].includes(id) ? existedTags.push(key) : null;
      }
    }

    const arrDiff = existedTags.filter(el => !arrTags.includes(el));
    
    for(let tag of arrDiff) {
      const arrTag = objectTodosTags[String(tag)];
      const number = arrTag.indexOf(id);
      arrTag.splice(number, 1);
      if(!arrTag.length) {delete objectTodosTags[String(tag)]}
    }

    for(let tag of arrTags) {      
      arrKeys.includes(String(tag)) 
        ? objectTodosTags[String(tag)].includes(id)
          ? null
          : objectTodosTags[String(tag)].push(id)
        : objectTodosTags[String(tag)] = [id]
    setTodosTags(objectTodosTags);
    }      
  }

export function addFilteredTodos(filteredTodos:TodoType[], todosArr:TodoType[], filter:String[], todosTags: {  
  [key: string]: Number[]}, setFilteredTodos:React.Dispatch<React.SetStateAction<TodoType[]>>) {
  const finalTodos = [...filteredTodos];

  todosArr!.forEach(el => {          
    for(let tag of filter) {
      const arrIdByTag = todosTags[String(tag)];
      arrIdByTag.includes(el.id)?
        finalTodos.includes(el)?
          null
          :finalTodos.push(el) 
      : null;
    }        
  })

  let arrIdInFilter:Number[][] = [];

  for(let tag of filter) {
    const arrIdByTag = todosTags[String(tag)];
    arrIdInFilter.push(arrIdByTag);
  }
    
  const finalTodosAfterDelete = finalTodos.filter( el => arrIdInFilter.flat().includes(el.id))

  setFilteredTodos(finalTodosAfterDelete);
}
