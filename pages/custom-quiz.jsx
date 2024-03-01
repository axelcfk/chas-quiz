import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  selectAllQuizzes,
  setCurrentQuiz,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
// import CustomQuizList from "@/Components/customQuizList";
export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array
  const dispatch = useDispatch();
  const finishedQuizzes = useSelector(selectAllQuizzes);
  const userQuiz = useSelector((state) => state.customQuiz.allQuizzes);
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
    dispatch(setCurrentQuiz(newQuiz));
    // When click on "Make Quiz" button, reset the form
    setQuizName("");
    setQuestions([]);
  };
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
      <div>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question.question}</li> // Show the questions in the list
          ))}
        </ul>
      </div>
      <button onClick={handleMakeQuiz}>Make Quiz</button>
      {/* {finishedQuizzes.length > 0 &&  <CustomQuizList finishedQuizzes={finishedQuizzes} />} */}
      //? Maybe send props?
      <div>
        {userQuiz.results &&
          userQuiz.results.map((item) => (
            <div key={item.question}>
              <p>Question: {item.question}</p>
              <p>Correct Answer: {item.correct_answer}</p>
              <p>Incorrect Answers: {item.incorrect_answers.join(", ")}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
