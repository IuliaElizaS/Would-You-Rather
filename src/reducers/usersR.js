const usersR = (state, action) => {
    switch (action.type) {
    case actionTypes.SET_LOGED_IN_USER:
        return {
        ...state,
        loggedInUser: state[users][action.payload]
        };
    case actionTypes.LOG_OUT_USER:
      return {
      ...state,
      loggedInUser: {},
      };
    case actionTypes.ADD_SCORE_TO_USER_OBJ:
        Object.keys(state.users).forEach((user) => {
          user.score = Object.keys(user.answers).length + user.questions.length;
          console.log(user);
        });
        return {
        ...state,
        users
        };
    case actionTypes.UPDATE_USER_QUESTIONS:
      const userId = action.payload.author;
      const questionId = action.payload.id;
      let questionsArr= state.users[userId].questions;
      questionsArr.push(questionId);

      return {
      ...state,
      users: {
        ...state[users],
        [userId]:{
          ...state[users][userId],
          questions: questionArr
        }
      }
    };
    case actionTypes.UPDATE_USER_ANSWERS:
      const { userId, questionId, option} = action.payload;
      
      return {
        ...state,
        users: {
          ...state[users],
          [userId]:{
            ...state[users][userId],
            answers: {
              questionId: option
            }
          }
        }
      };
    case actionTypes.UPDATE_USER_SCORE:
      const userId = action.payload;
      const newScore = state.users[userId].score + 1;

      return {
        ...state,
        users: {
          ...state[users],
          [userId]:{
          ...state[users][userId],
          score: newScore
          }
        }
      };
    default:
      return state;
}}

export default usersR;