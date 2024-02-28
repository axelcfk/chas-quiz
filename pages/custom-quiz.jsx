// import { addCustomQuiz, editCustomQuiz, removeCustomQuiz, toggleCompleteQuiz } from "@redux/CustomQuizPage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomQuizPage() {
  const [question, setQuestion] = useState("");

  function handleInputChange(event) {
    setQuestion(event.target.value);
  }

  function handleAddQuestion() {
    dispatch(addCustomQuiz(question));
  }

  function toggleCompleteQuiz() {
    dispatch(toggleCompleteQuiz());
  }

  function handleEditQuestion() {
    dispatch(editCustomQuiz(question));
  }

  function handleRemoveQuestion() {
    dispatch(removeCustomQuiz(question));
  }


  return (
    <div>
      <div className="flex flex-col">
        <h1 className="flex justify-center">Custom-quiz page</h1>
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="enter your question here"
          value={question}
        ></input>
        <button onClick={handleAddQuestion}>Add question</button>
      </div>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}
