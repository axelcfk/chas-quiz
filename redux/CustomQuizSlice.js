import { createSlice } from "@reduxjs/toolkit";

export const customQuizSlice = createSlice({
  name: "customQuiz",
  initialState: {
    currentQuiz: null,
    allQuizzes: [], // store all the quizzes
  },
  reducers: {
    addCustomQuiz: (state, action) => {
      state.allQuizzes.push(action.payload);
    },
    addFinishedQuiz: (state, action) => {
      state.allQuizzes.push(action.payload);
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

    toggleCompleteQuiz: (state, action) => {
      const quizId = action.payload;
      const completeQuizIndex = state.questions.findIndex(
        (quiz) => quiz.id === quizId
      );

      if (completeQuizIndex !== -1) {
        state.questions[completeQuizIndex].done =
          !state.questions[completeQuizIndex].done;
      }
    },
  },
});

export const {
  addCustomQuiz,
  addFinishedQuiz,
  setCurrentQuiz,
} = customQuizSlice.actions;

export const selectSubmittedQuizzes = (state) => state.customQuiz.currentQuiz ? [state.customQuiz.currentQuiz] : [];

export const selectAllQuizzes = (state) => state.customQuiz.allQuizzes;

export default customQuizSlice.reducer;
