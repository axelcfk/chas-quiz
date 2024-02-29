import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuiz, addFinishedQuiz } from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/CustomQuizList";

export default function CustomQuizPage() {
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);

  const userQuiz = useSelector((state) => state.customQuiz.allQuizzes)

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData];
    setQuestions(updatedQuestions);
  };

  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;

    const newQuiz = {
      name: quizName,
      questions: questions.map(question => ({
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: question.incorrect_answers,
      })),

    };

    dispatch(addFinishedQuiz(newQuiz)); // Add the new quiz to finished quizzes
    dispatch(setCurrentQuiz(null)); // Reset current quiz
    setQuizName("");
    setQuestions([]);

  };

  console.log(userQuiz);

  return (
    <div>
      <h1>Make your own Quiz</h1>
<span>Quiz Name</span>
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
            <li key={index}>{question.question}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleMakeQuiz}>Make Quiz</button>
      <div>
        {userQuiz.map(item => (
          <div key={item.question}>
            <p>Question: {item.question}</p>
            <p>Correct Answer: {item.correct_answer}</p>
            <p>Incorrect Answers: {item.incorrect_answers.join(', ')}</p>
          </div>
        ))}
      </div>
      {/* <CustomQuizList quizzes={finishedQuizzes} /> */}
    </div>
  );
}
