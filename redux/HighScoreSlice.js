import { createSlice } from "@reduxjs/toolkit";

export const highScoreSlice = createSlice({
  name: "highscore",
  initialState: {
    value: 0
  },
  
  reducers: {
    updateHighscore: (state, action) => {
      if(action.payload > state.value){
        state.value = action.payload;
      }
    },
  }

})

export const { updateHighscore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
