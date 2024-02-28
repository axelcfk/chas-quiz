const initialState = {
  options: {
    question_category: "",
    question_difficulty: "",
  },
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return {
        ...state,
        options: {
          ...state.options,
          question_category: action.value,
        },
      };
    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        options: {
          ...state.options,
          question_difficulty: action.value,
        },
      };

    default:
      return state;
  }
}
