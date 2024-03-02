import { createSlice } from "@reduxjs/toolkit";

export const customQuizSlice = createSlice({
  name: "customQuiz",
  initialState: {
    currentQuiz: null,
    allQuizzes: { results: [] },
    allQuizzes2: [], // store all the quizzes
  },
  reducers: {
    addCustomQuiz: (state, action) => {
      state.allQuizzes = {
        ...state.allQuizzes,
        results: [...state.allQuizzes.results, action.payload],
      };
    },
    addFinishedQuiz: (state, action) => {
      state.allQuizzes2.push(action.payload);
    },

    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },

    editCustomQuiz: (state, action) => {
      const { id, updatedQuestion } = action.payload;
      const questionIndex = state.allQuizzes.results.findIndex(
        (question) => question.id === id
      );
      if (questionIndex !== -1) {
        state.allQuizzes.results[questionIndex] = updatedQuestion;
      }
    },

    removeCustomQuiz: (state, action) => {
      const questionIdToRemove = action.payload.id;
      state.allQuizzes.results = state.allQuizzes.results.filter(
        (question) => question.id !== questionIdToRemove
      );
    },
  },
});

export const {
  addCustomQuiz,
  addFinishedQuiz,
  setCurrentQuiz,
  editCustomQuiz,
  removeCustomQuiz,
} = customQuizSlice.actions;

export const selectSubmittedQuizzes = (state) =>
  state.customQuiz.currentQuiz ? [state.customQuiz.currentQuiz] : [];

export const selectAllQuizzes = (state) => state.customQuiz.allQuizzes;

export const selectAllFinishedQuizzes = (state) => state.customQuiz.allQuizzes2;

export default customQuizSlice.reducer;
