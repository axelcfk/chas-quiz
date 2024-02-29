import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomQuiz, setCurrentQuiz, selectAllFinishedQuizzes } from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/CustomQuizList";

export default function CustomQuizPage() {
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions

  
  const finishedQuizzes = useSelector(selectAllFinishedQuizzes); // Fetch the questions from redux store
  
  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData]; // Adds the new question to the list
    setQuestions(updatedQuestions); // update the state
    dispatch(addCustomQuiz(newQuestionData)); // sends the new question to the redux store
  };

  const handleMakeQuiz = () => {
  if (questions.length === 0 || quizName.trim() === "") return;

const newQuiz = {
  name: quizName,
  questions: [...questions],
};

    dispatch(setCurrentQuiz(newQuiz));
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
        onAddQuestion={handleAddQuestion}
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
      <CustomQuizList/>
    </div>
  );
}



// So much code right now....
