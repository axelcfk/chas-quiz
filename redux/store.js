import { configureStore } from "@reduxjs/toolkit";
import customQuizSlice from "./CustomQuizSlice";

export default configureStore({
  reducer: {
    customQuiz: customQuizSlice,
  },
});
