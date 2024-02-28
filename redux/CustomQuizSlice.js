import { createSlice } from "@reduxjs/toolkit";

export const customQuizSlice = createSlice({
  name: "customQuiz",
  initialState: [],

  reducers: {
    addCustomQuiz: (state, action) => {
      const newCustomQuiz = {
        id: Date.now(),
        customQuizTitle: action.payload,
        done: false,
      };
      state.push(newCustomQuiz);
    },

    //Osäker ifall det fungerar
    editCustomQuiz: (state, action) => {
      const { id, newTitle } = action.payload;
      const editQuiz = state.find((quiz) => quiz.id === id);
      if (editQuiz) {
        editQuiz.customQuizTitle = newTitle;
      }
    },
    //Osäker ifall det fungerar

    removeCustomQuiz: (state, action) => {
      const index = state.findIndex((custom) => custom.id === action.payload);
      if (index !== -1);
      {
        state.splice(index, 1);
      }
    },
    toggleCompleteQuiz: (state, action) => {
      const completeQuiz = state.findIndex(
        (completeQuiz) => completeQuiz.id === action.payload
      );
      if (completeQuiz) {
        completeQuiz.done = !completeQuiz.done;
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
