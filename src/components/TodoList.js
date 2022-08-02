import React, { useState } from "react";

export default function Todolist({ todos, removeTodo, updateTodo, addNote }) {
  const styles = {
    // regular button
    editBtn: {
      color: "#222222",
      backgroundColor: "rgba(233, 12, 123, 0.87)",
      height: "45px",
      border: "none",
      width: "69px",
      fontSize: "18px",
      fontWeight: "bold",
      marginLeft: "auto",
      position: "absolute",
      right: "71px",
      top: "0px",
      cursor: "pointer",
    },
    // can't press button
    altBtn: {
      color: "#222222",
      backgroundColor: "rgba(233, 12, 123, 0.87)",
      height: "45px",
      border: "none",
      width: "69px",
      fontSize: "18px",
      fontWeight: "bold",
      marginLeft: "auto",
      position: "absolute",
      right: "71px",
      top: "0px",
      cursor: "pointer",
      boxShadow: "0 0 20px green",
    },
  };

  const [edit, setEdit] = useState({
    editId: null,
    editState: false,
  });

  const [note, setNote] = useState({
    noteId: null,
    noteState: false,
  });

  const [value, setValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [activeEditingId, setActiveEditingId] = useState(null);

  const handleEditState = (id, state, todoValue) => {
    if (
      (note.noteState !== true && activeEditingId === null) ||
      activeEditingId === id
    ) {
      setActiveEditingId(id);
      setValue(todoValue);
      setEdit({
        editId: id,
        editState: state,
      });
      setNoteValue(todos[id].note);
      if (state !== true) {
        if (!todos[id].hasOwnProperty("note")) {
          updateTodo(id, value);
          setActiveEditingId(null);
        } else {
          updateTodo(id, value);
          addNote(id, noteValue);
          setNoteValue("");
          setActiveEditingId(null);
        }
      }
    } else {
      return;
    }
  };

  const handleNoteState = (id, state) => {
    if (todos[id].hasOwnProperty("note")) {
      alert("no clickey");
      return;
    } else {
      if (edit.editState !== true) {
        setNote({
          noteId: id,
          noteState: state,
        });
        if (state !== true) {
          if (noteValue !== "") {
            addNote(id, noteValue);
            setNoteValue("");
          }
          return;
        }
      }
      return;
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };

  const showAllList = () => {
    return todos.map((item, index) => {
      return (
        <ul key={index}>
          <li key={item.todo + "_" + item.id}>
            {item.todo}{" "}
            {item.id === note.noteId && note.noteState === true ? (
              <button
                className="note-btn"
                onClick={() => handleNoteState(item.id, false)}
              >
                SAVE
              </button>
            ) : (
              <button
                className="note-btn"
                onClick={() => handleNoteState(item.id, true)}
              >
                NOTE
              </button>
            )}
            {item.id === edit.editId && edit.editState === true ? (
              <button
                style={styles.altBtn}
                onClick={() => handleEditState(item.id, false)}
              >
                SAVE
              </button>
            ) : (
              <button
                style={styles.editBtn}
                onClick={() => handleEditState(item.id, true, item.todo)}
              >
                EDIT
              </button>
            )}
            <button className="todo-btn" onClick={() => removeTodo(item.id)}>
              ✔
            </button>
          </li>
          {item.id === edit.editId && edit.editState === true && !item.note ? (
            <>
              <input
                className="input-edit"
                type="text"
                autoFocus
                defaultValue={item.todo}
                onChange={handleChange}
              />
            </>
          ) : null}
          {item.id === edit.editId && edit.editState === true && item.note ? (
            <>
              <input
                className="input-edit"
                type="text"
                autoFocus
                defaultValue={item.todo}
                onChange={handleChange}
              />
              <textarea
                className="edit-input-textarea"
                autoFocus
                onChange={handleNoteChange}
                defaultValue={item.note}
              ></textarea>
            </>
          ) : null}
          {item.id === note.noteId && note.noteState === true ? (
            <textarea
              className="input-textarea"
              autoFocus
              onChange={handleNoteChange}
              defaultValue={item.note}
            ></textarea>
          ) : null}
          {item.note && edit.editState === false ? (
            <div className="readonly-textarea" readOnly={true}>
              {item.note}
            </div>
          ) : null}
        </ul>
      );
    });
  };

  return (
    <div>
      <h2>Todo List:</h2>
      {showAllList()}
    </div>
  );
}
