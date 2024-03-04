import { createSlice } from "@reduxjs/toolkit";

export const highScoreSlice = createSlice({
  name: "highscore",
  initialState: 0, // originally we used this: initialState: { value: 0 }, but it made it confusing when updating localStorage?

  reducers: {
    updateHighscore: (state, action) => {
      const newScore = action.payload;
      if (typeof newScore === "number" && newScore > state) {
        return newScore;
      }
      return state;
    },
  },
});

export const { updateHighscore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
