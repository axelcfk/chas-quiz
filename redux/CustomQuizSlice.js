import { createSlice } from "@reduxjs/toolkit";

export const customQuizSlice = createSlice({
  name: "customQuiz",
  initialState: {
    currentQuiz: null,
    allQuizzes: { results: [] }, // store all the quizzes
    currentQuizName: "",
    
  },
  reducers: {
    addCustomQuiz: (state, action) => {
      state.allQuizzes = {
        ...state.allQuizzes,
        results: [...state.allQuizzes.results, action.payload],
      };
    },
    addFinishedQuiz: (state, action) => {
      return {
        ...state,
        allQuizzes: {
          results: [...state.allQuizzes.results, action.payload],
        },
      };
    },

    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },

    editCustomQuiz: (state, action) => {
      const { id, newTitle } = action.payload;
      const editQuiz = state.questions.find((quiz) => quiz.id === id);
      if (editQuiz) {
        editQuiz.customQuizTitle = newTitle;
      }
    },

    removeCustomQuiz: (state, action) => {
      const updatedQuestions = state.questions.filter(
        (custom) => custom.id !== action.payload
      );
      return {
        ...state,
        questions: updatedQuestions,
      };
    },
  },
});

export const { addCustomQuiz, addFinishedQuiz, setCurrentQuiz } =
  customQuizSlice.actions;

export const selectSubmittedQuizzes = (state) =>
  state.customQuiz.currentQuiz ? [state.customQuiz.currentQuiz] : [];

export const selectAllQuizzes = (state) => state.customQuiz.allQuizzes;

export default customQuizSlice.reducer;
