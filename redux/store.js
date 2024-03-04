import { configureStore } from "@reduxjs/toolkit";

import customQuizSlice from "./CustomQuizSlice";
import highScoreSlice from "./HighScoreSlice";

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("highscore");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("highscore", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

//export const preloadedState = loadState();
export const preloadedState = loadState();


export const store = configureStore({
  reducer: {
    customQuiz: customQuizSlice,
    highscore: highScoreSlice,
  },
  //preloadedState,
  //preloadedState: loadState(), // Ensure loadState is called here
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state.highscore);
});

export default store; 