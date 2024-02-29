import { configureStore } from "@reduxjs/toolkit";
import customQuizSlice from "./CustomQuizSlice";

import highScoreReducer from "./HighScoreSlice"

export default configureStore({
  reducer: {
    customQuiz: customQuizSlice,
    highscore: highScoreReducer,
  },
});
