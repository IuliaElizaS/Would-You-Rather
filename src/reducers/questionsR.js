const questionsR = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_ANSWER_TO_STATE:
        const { userId, questionId, option } = action.payload;
        let votesArr= state.questions[questionId][option].votes;
        votesArr.push(userId);

        return {
        ...state,
        questions: {
          ...state[questions],
          [questionId]:{
            ...state[questions][questionId],
            [option]:{
              ...state[questions][questionId][option],
              votes: votesArr
            }
          }
        }
      };
      case actionTypes.ADD_QUESTION_TO_STATE:
        const questId = action.payload.id;

        return {
          ...state,
          questions: {
            ...state[questions],
            [questId]: action.payload
          }
        };
     case actionTypes.SET_CURRENT_QUESTION:
        return {
          ...state,
          currentQuestion: state[questions][action.payload],
          };
     default: 
        return state;
  }
}

export default questionsR;