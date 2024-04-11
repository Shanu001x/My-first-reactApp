import React, { useState } from "react";

function CreateTodo() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div>
      <input
        id="title"
        onChange={(e) => {
          settitle(e.target.value);
        }}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="title"
      />{" "}
      <br />
      <input
        id="desc"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="description"
      />{" "}
      <br />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todo",  {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "content-type": "application/json",
            }

          })
           .then(async function(res) {
              const json = res.json();
              alert("todo added");
            });
        }}
        style={{ margin: 10, padding: 10 }}
      >
        Add a todo
      </button>
    </div>
  );
}

export default CreateTodo;
