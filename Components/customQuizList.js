import { useSelector } from "react-redux";
import { selectAllQuestions } from "@redux/CustomQuizSlice/CustomQuestions";

function QuizList() {
  const allQuestions = useSelector(selectAllQuestions);

  return (
    <div>
      <h2>Your quizzes</h2>
      <ul>
        {allQuestions.map((question, index) => (
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
    </div>
  );
}

export default QuizList;
