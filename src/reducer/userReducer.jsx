const userReducer = (action, state) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return { ...state, userDetails: action.payload };

    case "SET_USER_TECH_STACK":
      let techStackList = action.payload.map((item) => item.stack);
      return { ...state, userTechStack: techStackList };
    default:
      return state;
  }
};

export default userReducer;
