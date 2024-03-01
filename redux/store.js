import { configureStore } from "@reduxjs/toolkit";

import customQuizSlice from "./CustomQuizSlice";
import highScoreSlice from "./HighScoreSlice";

export default configureStore({
  reducer: {
    customQuiz: customQuizSlice,
    highscore: highScoreSlice,
  },
});
