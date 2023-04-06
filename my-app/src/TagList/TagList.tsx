import React, { useState } from 'react';
import styles from "./TagList.module.scss"

type TagListProps = {
  todosTags: { [key: string]: {'id': number, 'todosId':Number[]} },
  onRemove: (el:string) => void,
  onSetFilter: (el:string) => void,
  tagsInEditTodoArr:String[]
}

export default function TagList(props:TagListProps) {
  const [filterOn, setFilterOn] = useState<Number[]>([]);
  
  function toggleActive(index:Number) {
    const arr = [...filterOn];
    if(arr.includes(index)) {
      arr.splice(arr.indexOf(index),1)
    } else {
      arr.push(index)
    }
    setFilterOn(arr);
  }

  function chooseClassForTag(i:number, tagsInEditTodoArr:String[], tagName:string) {
    let result:string = '';

    if(filterOn.includes(i) && tagsInEditTodoArr.length === 0) {      
      result = styles.tagslist_item_active
    } else if(filterOn.includes(i) === false && tagsInEditTodoArr.length === 0){
      result = styles.tagslist_item
    } else if(filterOn.includes(i) && tagsInEditTodoArr.length !== 0) {
      tagsInEditTodoArr.includes(tagName) ? result = styles.tagslist_item_active_edit : result = styles.tagslist_item_active
    } else if(filterOn.includes(i) === false && tagsInEditTodoArr.length !== 0) {
      tagsInEditTodoArr.includes(tagName) ? result = styles.tagslist_item_edit : result = styles.tagslist_item
    }

    return result;
  }

  return (
    <ul className={styles.tagslist}>
      {Object.keys(props.todosTags).map((el) => {
        return(
        <div className={styles.wrapper_tags} key={props.todosTags[el].id}>
        <li className={chooseClassForTag(props.todosTags[el].id, props.tagsInEditTodoArr, el)}
          key={props.todosTags[el].id} 
          onClick={() => {props.onSetFilter(el); toggleActive(props.todosTags[el].id)}}
        >
          {el}
        </li>
        <button className={styles.rm} onClick={() => props.onRemove(el)}>&times;</button>
        </div>
        )
      })}
    </ul>
  )
}
