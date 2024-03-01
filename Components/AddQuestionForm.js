import React, { useState } from "react";

function AddQuestionForm({ onAddQuestion, newQuestion, setNewQuestion }) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState(["", "", ""]);
const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (index, value) => {
    const newWrongAnswers = [...wrongAnswers];
    newWrongAnswers[index] = value;
    setWrongAnswers(newWrongAnswers);
  };

  const handleAddQuestion = () => {

if(newQuestion.trim() === "" || correctAnswer.trim() === "" || wrongAnswers.some(answer => answer.trim() === "")) {
  setErrorMessage("Please fill in all the fields");
  return;
}
    const newQuestionData = {
      question: newQuestion,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers.filter((answer) => answer.trim() !== ""),
    };

    onAddQuestion(newQuestionData);
    setNewQuestion("");
    setCorrectAnswer("");
    setWrongAnswers(["", "", ""]);
setErrorMessage("");
  };

  const handleWrongAnswerChange = (index, value) => {
    const newWrongAnswers = [...wrongAnswers];
    newWrongAnswers[index] = value;
    setWrongAnswers(newWrongAnswers);
  };

  return (
    <div className="grid grid-cols- grid-rows- gap-4 justify-items-center">
      <label className="text-center text-2xl mt-2 mb-2">
        Question:
        <input
          className="w-full border-gray-300 mb-4 px-3 py-3 rounded-3xl border-solid focus:outline-none text-center mt-1"
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </label>
    <div className="grid grid-cols-2 space-x-3">
      <label>
        <input
          className="w-full mt-1 px- py-2.5 rounded-lg border border-gray-300 focus:outline-none border-solid"
          type="text"
          placeholder="Correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </label>
      <label>
        {wrongAnswers.map((answer, index) => (
          <input
            key={index}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none  border-solid"
            type="text"
            value={answer}
            placeholder="Wrong answer"
            onChange={(event) =>
              handleWrongAnswerChange(index, event.target.value)
            }
          />
        ))}
      </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none mt-8"
        type="button"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddQuestionForm;
