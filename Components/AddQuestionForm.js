import React, { useState } from "react";

function AddQuestionForm({ onAddQuestion, newQuestion, setNewQuestion }) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState(["", "", ""]);

  const handleInputChange = (index, value) => {
    const newWrongAnswers = [...wrongAnswers];
    newWrongAnswers[index] = value;
    setWrongAnswers(newWrongAnswers);
  };

  const handleAddQuestion = () => {
    const newQuestionData = {
      question: newQuestion,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers.filter((answer) => answer.trim() !== ""),
    };

    onAddQuestion(newQuestionData);
    setNewQuestion("");
    setCorrectAnswer("");
    setWrongAnswers(["", "", ""]);
  };

  const handleWrongAnswerChange = (index, value) => {
    const newWrongAnswers = [...wrongAnswers];
    newWrongAnswers[index] = value;
    setWrongAnswers(newWrongAnswers);
  };

  return (
    <div className="grid grid-cols- grid-rows- gap-4 justify-items-center">
      <label className="text-center text-2xl">
        Question:
        <input
          className="w-full border-gray-300 mb-4 px-3 py-3 rounded-3xl border-solid focus:outline-none text-center"
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </label>
    <div className="grid grid-cols-2">
      <label>
        <input
          className="w-full mt-1 px- py-2 rounded-lg border border-gray-300 focus:outline-none border-solid focus:border-blue-500"
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
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none"
        type="button"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
    </div>
  );
}

export default AddQuestionForm;
