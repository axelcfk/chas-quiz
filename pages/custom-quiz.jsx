import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  addFinishedQuiz,
  selectAllQuizzes,
  selectAllFinishedQuizzes,
  setCurrentQuiz,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array
  const dispatch = useDispatch();
  const userQuiz = useSelector(selectAllQuizzes);
  const finishedQuizzes = useSelector(selectAllFinishedQuizzes);

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData]; // Adds the new question to the list
    setQuestions(updatedQuestions); // update the state
  };

  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;
    const newQuiz = {
      name: quizName,
      results: [...questions],
    };
    dispatch(addCustomQuiz(newQuiz)); // Add quiz to redux store
    dispatch(addFinishedQuiz(newQuiz)); // Add finished quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));
    // When click on "Make Quiz" button, reset the form
    setQuizName("");
    setQuestions([]);
  };

console.log(finishedQuizzes);
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />
      <AddQuestionForm
        onAddQuestion={(newQuestionData) => {
          handleAddQuestion(newQuestionData);
          dispatch(addCustomQuiz(newQuestionData)); // Dispatch action to add question to Redux store
        }}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />
      <button onClick={handleMakeQuiz}>Make Quiz</button>
      <div>
        <h2>Finished Quizzes</h2>
        <ul>
          {finishedQuizzes.map((quiz, index) => (
            <li key={index}>{quiz.name}</li>
          ))}
        </ul>
        {userQuiz.results &&
          userQuiz.results.map((item) => (
            <div key={item.question}>
              <p>Question: {item.question}</p>
              <p>Correct Answer: {item.correct_answer}</p>
              <p>
                Incorrect Answers:{" "}
                {item.incorrect_answers && item.incorrect_answers.join(", ")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
