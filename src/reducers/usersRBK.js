const usersR = (state, action) => {
    switch (action.type) {
    case actionTypes.SET_LOGED_IN_USER:
        return {
        ...state,
        loggedInUser: `state.users.${action.payload}`// stores the loged in user's data 
        };
    case actionTypes.LOG_OUT_USER:
      return {
      ...state,
      loggedInUser: {},
      };
    case actionTypes.ADD_SCORE_TO_USER_OBJ:
        Object.keys(users).forEach((user) => {
          user.score = Object.keys(user.answers).length + user.questions.length;
          console.log(user);
        });
        return {
        ...state,
        users
        };
    case actionTypes.UPDATE_USER_QUESTIONS:
      let questionsArr= `state.users.${action.payload.author}.questions`;
      questionsArr.push(`${action.payload.id}`);
      return {
      ...state,
      state.users.`${action.payload.author}`.questions: questionsArr,
      };
    case actionTypes.UPDATE_USER_SCORE:
        let newScore = `state.users.${action.payload}.score` + 1;
        return {
        ...state,
        state.users.`${action.payload}`.score: newScore,
        };
      default: 
        return state;
  }
}

export default usersR;