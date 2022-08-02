import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoMain() {
  const [todoList, setTodoList] = useState([
    {
      todo: "example todo",
      id: 0,
    },
    {
      todo: "example todo with a note",
      id: 1,
      note: "example note",
    },
  ]);
  const addTodo = (newTodo) => {
    // if todoList is empty it gets assigned id value of 0, if there are todos in array it gets assigned latest id + 1
    // declare new list with todos with new added todo object at end
    // setTodoList state with newTodoList array
    const idNum = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
    const newTodoList = [...todoList, { todo: newTodo, id: idNum }];
    setTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    // filter out todo based on todoList.id then assign new list to newTodoList
    // setTodoList state with the new array list
    const newTodoList = [...todoList].filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  const updateTodo = (id, newValue, noteValue) => {
    // update todo takes in id, newValue
    // setTodoList takes previous state loops through it taking item as parameter
    // if item.id === id true it will modify the object with new value otherwise it will return item unchanged
    if (noteValue !== undefined && noteValue !== "") {
      setTodoList((prev) =>
        prev.map((item) =>
          item.id === id
            ? { todo: newValue, id: item.id, note: noteValue }
            : item
        )
      );
    } else {
      setTodoList((prev) =>
        prev.map((item) =>
          item.id === id ? { todo: newValue, id: item.id } : item
        )
      );
    }
  };

  const addNote = (id, noteValue) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { todo: item.todo, id: item.id, note: noteValue }
          : item
      )
    );
  };

  return (
    <div>
      <h1>My Todo List!</h1>
      <TodoForm submit={addTodo} />
      <TodoList
        todos={todoList}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        addNote={addNote}
      />
    </div>
  );
}
