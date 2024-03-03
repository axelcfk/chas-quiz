import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  addFinishedQuiz,
  selectAllQuizzes,
  selectAllFinishedQuizzes,
  setCurrentQuiz,
  editCustomQuiz,
  removeCustomQuiz,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array
  const [editingIndex, setEditingIndex] = useState(null);

  const dispatch = useDispatch();
  const finishedQuizzes = useSelector(selectAllFinishedQuizzes);

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [
      ...questions,
      { id: Date.now(), ...newQuestionData },
    ];
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (questionIdToRemove) => {
    const updatedQuestions = questions.filter(question => question.id !== questionIdToRemove);
    setQuestions(updatedQuestions);
  };
  
  const handleEditQuestion = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = {
      ...updatedQuestions[editingIndex],
      id: Date.now(), // Generate a new ID for the updated question
    };
    // Make sure the updated questions are saved in Redux
    dispatch(
      editCustomQuiz({
        id: updatedQuestions[editingIndex].id,
        updatedQuestion: updatedQuestions[editingIndex],
      })
    );
    setEditingIndex(null);
  };

  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;

    const newQuiz = {
      name: quizName,
      results: [...questions],
    };

    dispatch(addFinishedQuiz(newQuiz)); // Add finished quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));

    setQuizName("");
    setQuestions([]);
  };

  console.log(questions);

  return (
    <div className="flex justify-center flex-col">
      <h1 className="flex justify-center">Make your own quiz!</h1>
      <div className="flex justify-center mt-16">
        <input
          className="w-64 mb-10 px-3 py-3 text-center rounded-3xl border-solid border-blue-400 focus:outline-none"
          type="text"
          placeholder="Enter Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </div>
      <AddQuestionForm
        onAddQuestion={(newQuestionData) => {
          handleAddQuestion(newQuestionData);
          dispatch(addCustomQuiz(newQuestionData)); // Dispatch action to add question to Redux store
        }}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />

      <div className="flex justify-center flex-col bg-pink-300">
        <button
          className="w-28 mt-10 bg-blue-500 hover:bg-blue-400  text-white font-bold border-none py-4 px-4 hover rounded-3xl focus:outline-none focus:shadow-outline mx-auto cursor-pointer"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
        <h2 className="flex justify-center pt-6">Finished Quizzes:</h2>
        <div className="flex justify-center">
          <ul className="flex justify-center font-bold text-xl text-white flex-col">
            Quizzes: &nbsp;
            {finishedQuizzes.map((quiz, index) => (
              <li key={index}>{quiz.name}</li>
            ))}
          </ul>
        </div>


        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => {
                      const updatedQuestion = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = [...prevQuestions];
                        updatedQuestions[index].question = updatedQuestion;
                        return updatedQuestions;
                      });
                    }}
                  />
                  <input
                    type="text"
                    value={question.incorrect_answers[0]}
                    onChange={(e) => {
                      const updatedAnswer = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = prevQuestions.map((q, i) => {
                          if (i === index) {
                            return {
                              ...q,
                              incorrect_answers: [
                                updatedAnswer,
                                q.incorrect_answers[1],
                                q.incorrect_answers[2],
                              ],
                            };
                          }
                          return q;
                        });
                        return updatedQuestions;
                      });
                    }}
                  />
                  <input
                    type="text"
                    value={question.incorrect_answers[1]}
                    onChange={(e) => {
                      const updatedAnswer = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = prevQuestions.map((q, i) => {
                          if (i === index) {
                            return {
                              ...q,
                              incorrect_answers: [
                                q.incorrect_answers[0],
                                updatedAnswer,
                                q.incorrect_answers[2],
                              ],
                            };
                          }
                          return q;
                        });
                        return updatedQuestions;
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={question.incorrect_answers[2]}
                    onChange={(e) => {
                      const updatedAnswer = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = prevQuestions.map((q, i) => {
                          if (i === index) {
                            return {
                              ...q,
                              incorrect_answers: [
                                q.incorrect_answers[0],
                                q.incorrect_answers[1],
                                updatedAnswer,
                              ],
                            };
                          }
                          return q;
                        });
                        return updatedQuestions;
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={question.correct_answer}
                    onChange={(e) => {
                      const updatedAnswer = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = [...prevQuestions];
                        updatedQuestions[index].correct_answer = updatedAnswer;
                        return updatedQuestions;
                      });
                    }}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <>
                  <p>Question: {question.question}</p>
                  <p>Incorrect answer 1: {question.incorrect_answers[0]}</p>
                  <p>Incorrect answer 2: {question.incorrect_answers[1]}</p>
                  <p>Incorrect answer 3: {question.incorrect_answers[2]}</p>

                  <p>Correct: {question.correct_answer}</p>
                  <div className="flex">
                    <button
                      className="flex items-center justify-center md:flex"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <p className="text-black hidden md:flex ">edit</p>
                      <div className="flex flex-row space-x-2">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                    </button>
                    <button
                      className="hidden md:flex"
                      onClick={() => handleRemoveQuestion(question)}
                    >
                      <p className="text-black">remove</p>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="md:hidden"
                      onClick={() => handleRemoveQuestion(question.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
