import React, { useState } from "react";

export default function Todoform({ submit }) {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    // handles change in input field and assigns that input in setInput state
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault stops default action of submit which is refreshing the site on submit
    // any input bellow 1 character or above 40 characters inclusive shows alert text if false it submits state input
    // after submiting it sets input back to empty string
    event.preventDefault();
    input.length <= 1 || input.length >= 40
      ? alert("Todo has to be larger than 1 character and less than 40")
      : submit(input); // submit is a prop name that was passed from todoMain
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button className="add-btn">ADD</button>
      </form>
    </div>
  );
}
