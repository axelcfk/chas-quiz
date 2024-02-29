import { createSlice } from "@reduxjs/toolkit";

export const highScoreSlice = createSlice({
  name: "highscore",
  initialState: {
    value: 0,
  },

  reducers: {
    updateHighscore: (state, action) => {
      const newScore = parseFloat(action.payload);
      if (!isNaN(newScore) && newScore > state.value) {
        state.value = newScore;
      }
    },
  },
});

export const { updateHighscore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
