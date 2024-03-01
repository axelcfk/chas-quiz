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
    <div>
      <label>
        Question:
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </label>
      <label>
        Correct answer:
        <input
          type="text"
          placeholder="Correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </label>
      <label>
        Wrong Answers:
        {wrongAnswers.map((answer, index) => (
            // creates a new <input> for each element in the array "wrongAnswers",
            // which is 3, instead of writing same code 3 times
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(event) => handleWrongAnswerChange(index, event.target.value)}
          />
        ))}
      </label>
      <button class type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      
      <ul>
        <li>
            <strong>Question:</strong>{newQuestion}
        </li>
        <li>
            <strong>Correct answer:</strong>{correctAnswer}
        </li>
        <li>
            <strong>Wrong Answers:</strong>{wrongAnswers.filter((answer) => answer.trim()!== "").join("", )}
        </li>
      </ul>
    </div>
  );
}

export default AddQuestionForm;

