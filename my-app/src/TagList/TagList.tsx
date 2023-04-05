import React, { useState } from 'react';
import styles from "./TagList.module.scss"

type TagListProps = {
  todosTags: {
    [key: string]: Number[]  
  },
  onRemove: (el:string) => void,
  onSetFilter: (el:string) => void
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

  return (
    <ul className={styles.tagslist}>
      {Object.keys(props.todosTags).map((el, i) => {
        return(
        <div className={styles.wrapper_tags} key={i}>
        <li className={filterOn.includes(i)? styles.tagslist_item_active : styles.tagslist_item}
          key={i} 
          onClick={() => {props.onSetFilter(el); toggleActive(i)}}
        >
          {el}
          {/* <button className={styles.rm} onClick={() => props.onRemove(el)}>&times;</button> */}
        </li>
        <button className={styles.rm} onClick={() => props.onRemove(el)}>&times;</button>
        </div>
        )
      })}
    </ul>
  )
}
