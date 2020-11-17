import {ADD_USERS_TO_STATE, SET_LOGGED_IN_USER, LOG_OUT_USER, ADD_SCORE_TO_USER_OBJ, UPDATE_USER_QUESTIONS, UPDATE_USER_ANSWERS} from '../actions/userA';

export const usersR = (state = {}, action) => {
    switch (action.type) {
    case ADD_USERS_TO_STATE:
      return {
        ...state,
        users: action.payload
      };
    case SET_LOGGED_IN_USER:
      return {
      ...state,
        loggedInUser: action.payload
      };
    case LOG_OUT_USER:
      return {
      ...state,
      loggedInUser: {},
      };
    case ADD_SCORE_TO_USER_OBJ:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user]: {
            ...state.users[action.payload.user],
            score: action.payload.totalScore
          }
        }
      };
    case UPDATE_USER_QUESTIONS:
      const userId = action.payload.author;
      const questionId = action.payload.id;

      return {
      ...state,
      users: {
        ...state.users,
        [userId]:{
          ...state.users[userId],
          questions: [
            ...state.users[userId].questions,
            questionId
          ]
        }
      }
    };
    case UPDATE_USER_ANSWERS:
      const uId = action.payload.authedUser;
      const qId = action.payload.qid;
      const option = action.payload.answer;

      return {
        ...state,
        users: {
          ...state.users,
          [uId]:{
            ...state.users[uId],
            answers: {
              ...state.users[uId].answers,
              [qId]: option
            }
          }
        }
      };
    default:
      return state;
}}

