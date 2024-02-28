import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  editCustomQuiz,
  removeCustomQuiz,
  toggleCompleteQuiz,
} from "@/redux/CustomQuizSlice";

export default function CustomQuizPage() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.customQuiz.questions);
  const [newQuestion, setNewQuestion] = useState("");
  const [editedQuestionId, setEditedQuestionId] = useState(null);
  const [editedQuestionValue, setEditedQuestionValue] = useState("");

  const handleInputChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      dispatch(addCustomQuiz(newQuestion));
      setNewQuestion("");
    }
  };

  const handleEditStart = (question) => {
    setEditedQuestionId(question.id);
    setEditedQuestionValue(question.question);
  };

  const handleEditDone = (id) => {
    dispatch(editCustomQuiz({ id, newTitle: editedQuestionValue }));
    setEditedQuestionId(null);
    setEditedQuestionValue("");
  };

  const handleRemoveQuestion = (id) => {
    dispatch(removeCustomQuiz(id));
  };

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="flex justify-center">Custom-quiz page</h1>
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="enter your question here"
          value={newQuestion}
        />
        <input type="text" placeholder="wrong answer"></input>
        <input type="text" placeholder="wrong answer"></input>
        <input type="text" placeholder="wrong answer"></input>
        <input type="text" placeholder="correct answer"></input>
        <button onClick={handleAddQuestion}>Add question</button>
      </div>
      <div>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {editedQuestionId === question.id ? (
                <>
                  <input
                    type="text"
                    value={editedQuestionValue}
                    onChange={(e) => setEditedQuestionValue(e.target.value)}
                  />
                  <button onClick={() => handleEditDone(question.id)}>
                    Done
                  </button>
                </>
              ) : (
                <>
                  {question.question}
                  <button onClick={() => handleEditStart(question)}>
                    Edit
                  </button>
                  <button onClick={() => handleRemoveQuestion(question.id)}>
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// TODO: Try to minimize the code? Arrange it in components?
// TODO: "setEditedQuestionValue" är lite missvisande i handleAddQuestion ?
// So much code right now....
