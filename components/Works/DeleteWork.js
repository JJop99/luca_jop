import { useState } from "react";

function DeleteWork() {
  const [workId, setWorkId] = useState("");
  const [message, setMessage] = useState("");

  const deleteHandler = async () => {
    try {
      const response = await fetch(`/api/works/delete?workId=${workId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Delete Work</h1>
      <input
        type="text"
        value={workId}
        onChange={(e) => setWorkId(e.target.value)}
        placeholder="Enter Work ID"
      />
      <button onClick={deleteHandler}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteWork;
