import React from "react";

function QuizList({ finishedQuizzes }) {
  return (
    <div>
      <h2>Finished Quizzes</h2>
      <ul>
        {finishedQuizzes && finishedQuizzes.map((quiz, index) => (
          <li key={index}>
            <strong>Quiz Name:</strong> {quiz.name}
            <ul>
              {quiz.questions.map((question, index) => (
                <li key={index}>
                  <strong>Question:</strong> {question.question}
                  <br />
                  <strong>Correct Answer:</strong> {question.correct_answer}
                  <br />
                  <strong>Wrong Answers:</strong>{" "}
                  {question.incorrect_answers.join(", ")}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;



