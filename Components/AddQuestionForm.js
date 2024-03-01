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
    if (
      newQuestion.trim() === "" ||
      correctAnswer.trim() === "" ||
      wrongAnswers.some((answer) => answer.trim() === "")
    ) {
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
    <div className="grid gap-4 justify-items-center">
      <label className="flex justify-center flex-col text-center text-2xl mt-6 font-semibold ">
          <p className="mb-2">Question:</p>
        <input
          className="w-full border-gray-300 mb-4 px-3 py-3 rounded-3xl border-solid focus:outline-none text-center mt-2"
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </label>
      <div className="grid grid-cols-2 space-x-3 mx-8">
        <div>
          <label>
            <input
              className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
              type="text"
              placeholder="Correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </label>
          {wrongAnswers.slice(0, 1).map((answer, index) => (
            <label key={index}>
              <input
                className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                type="text"
                value={answer}
                placeholder="Wrong answer"
                onChange={(event) =>
                  handleWrongAnswerChange(index, event.target.value)
                }
              />
            </label>
          ))}
        </div>
        <div>
          {wrongAnswers.slice(1).map((answer, index) => (
            <label key={index + 1}>
              <input
                className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                type="text"
                value={answer}
                placeholder="Wrong answer"
                onChange={(event) =>
                  handleWrongAnswerChange(index + 1, event.target.value)
                }
              />
            </label>
          ))}
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-10 rounded-3xl focus:outline-none focus:shadow-outline border-none mt-10 cursor-pointer"
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
