/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import './App.css';
import { addFilteredTodos, addTagsFromNewTodo, CorrectTodo, CreateFieldForNewTodo} from './functions/functions';
import TagList from './TagList/TagList';
import TodoList from './Todo/TodoList/TodoList';

export type TodoType = {
  id: number,
  name:string,
  flagChange:boolean
}

export function App() {
  const [todosArr, setTodos] = useState<TodoType[]>(window.localStorage.getItem('todosArr')? JSON.parse(window.localStorage.getItem('todosArr')!) :[]);
  const [todosTags, setTodosTags] = useState<{ [key: string]: {'id': number, 'todosId':Number[]} }>(window.localStorage.getItem('todosTags')? JSON.parse(window.localStorage.getItem('todosTags')!) :{});
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const [filterArr, setFilterArr] = useState<String[]>([]);
  const [tagsInEditTodoArr, setTagsInEditTodoArr] = useState<String[]>([]);
  const [changedTodo, setChangedTodo] = useState<TodoType>({
    id: 0,
    name: '',
    flagChange: false
})

  useEffect(() => {
    window.localStorage.setItem('todosArr', JSON.stringify(todosArr));
    window.localStorage.setItem('todosTags', JSON.stringify(todosTags));
    window.localStorage.setItem('filterArr', JSON.stringify(filterArr));
  }, [todosArr, todosTags, filterArr]);

  function addTodos(name:string) {
    const id = Date.now();
    setTodos(todosArr!.concat([{
      id,
      name,    
      flagChange: false
    }]));

    addTagsFromNewTodo(id, name, todosTags, setTodosTags) 
    console.log(todosTags)
  }

  function removeTodo(id:number) {
    setTodos(todosArr!.filter(todo=> todo.id !== id));
    setFilteredTodos(filteredTodos.filter(todo=> todo.id !== id));
  }

  function correctTodo(id:number, content:string) {
    setTodos(todosArr!.map(todo=> {
      if(todo.id === id) {
        todo.name = content
      }
      return todo;
    }))

    addTagsFromNewTodo(id, content, todosTags, setTodosTags)
  }

  function changeFlag(id:number) {
    setTodos(todosArr!.map(todo=> {
      if(todo.id === id) {
        todo.flagChange = !todo.flagChange
      }
      return todo;
    }))
  }

  function changeTodo(todo:TodoType) {
    setChangedTodo(todo);
  }

  function removeTag(tag:string) {
    const objTags = {...todosTags};
    delete objTags[tag];
    setTodosTags(objTags);
    setFilterArr(filterArr.filter(el => el !== tag))

  }

  function changeFilter(tag:string) {    
    const filter = [...filterArr];
   
    if(filter.includes(tag)) {      
      const number = filter.indexOf(tag);
      filter.splice(number, 1)
    } else {
      filter.push(tag);
    }

    const chekedFilter = filter.filter(el => Object.keys(todosTags).includes(String(el)))   

    setFilterArr(chekedFilter);
    addFilteredTodos(filteredTodos, todosArr, chekedFilter, todosTags, setFilteredTodos);
  }

  return (
    <div className="App">
      <CreateFieldForNewTodo onCreate={addTodos}/>
      <CorrectTodo      
        changedTodo={changedTodo}
        onCorrect={correctTodo}
        setChangedTodo={setChangedTodo}
        setTagsInEditTodoArr={setTagsInEditTodoArr}
      />
      <TagList onRemove={removeTag} todosTags={todosTags} onSetFilter={changeFilter} tagsInEditTodoArr={tagsInEditTodoArr} />
      {todosArr?.length! > 0?
      filterArr.length !== 0?      
      <TodoList      
        todos={filteredTodos}
        onDelete={removeTodo}
        onChangeFlag={changeFlag}
        onChangeTodo={changeTodo}
      />
      : <TodoList
        todos={todosArr!}
        onDelete={removeTodo}
        onChangeFlag={changeFlag}
        onChangeTodo={changeTodo}
       />
      : <p>No todos!</p>
      }      
    </div>
  );
}
