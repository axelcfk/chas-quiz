import { createSlice } from "@reduxjs/toolkit";

export const customQuizSlice = createSlice({
  name: "customQuiz",
  initialState: {
    questions: [],
  },
  reducers: {
    addCustomQuiz: (state, action) => {
      const newCustomQuiz = {
        id: Date.now(),
        question: action.payload,
        done: false,
      };
      return {
        ...state,
        questions: [...state.questions, newCustomQuiz],
      };
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
        custom => custom.id !== action.payload);
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
  editCustomQuiz,
  removeCustomQuiz,
  toggleCompleteQuiz,
} = customQuizSlice.actions;

export default customQuizSlice.reducer;
