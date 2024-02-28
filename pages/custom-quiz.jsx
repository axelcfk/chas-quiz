import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomQuiz, setCurrentQuiz } from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";

export default function CustomQuizPage() {
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]); // State to store all the questions

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData]; // Adds the new question to the list
    setQuestions(updatedQuestions); // update the state
    dispatch(addCustomQuiz(newQuestionData)); // sends the new question to the redux store
  };

  const handleMakeQuiz = () => {
    //TODO: Add logic to make the quiz
  };

  return (
    <div>
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
    </div>
  );
}



// So much code right now....
