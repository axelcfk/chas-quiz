import { useState } from "react";

export default function CustomQuizPage() {
  const [question, setQuestion] = useState("");

  function handleInputChange(event) {
    setQuestion(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center">admin page</h1>
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="enter your question here"
        value={question}
      ></input>
    </div>
  );
}
