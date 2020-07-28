import {ADD_USERS_TO_STATE, SET_LOGED_IN_USER, LOG_OUT_USER, ADD_SCORE_TO_USER_OBJ, UPDATE_USER_QUESTIONS, UPDATE_USER_ANSWERS, UPDATE_USER_SCORE} from '../actions/userA';

export const usersR = (state = {}, action) => {
    switch (action.type) {
    case ADD_USERS_TO_STATE:
      console.log(action.payload, `initial state in userR is ${state}`);
      return {
        ...state,
        users: action.payload
      };
    case SET_LOGED_IN_USER:
      let logedId = action.payload;
      return {
      ...state,
      logedInUser: state.users[logedId]
      };
    case LOG_OUT_USER:
      return {
      ...state,
      logedInUser: {},
      };
    case ADD_SCORE_TO_USER_OBJ:
        Object.keys(state.users).forEach((user) => {
          user.score = Object.keys(user.answers).length + user.questions.length;
          console.log(user);
        });
        return {
        ...state,
        users: {...state.users}
        };
    case UPDATE_USER_QUESTIONS:
      const userId = action.payload.author;
      const questionId = action.payload.id;
      let questionsArr= state.users[userId].questions;
      questionsArr.push(questionId);

      return {
      ...state,
      users: {
        ...state.users,
        [userId]:{
          ...state.users[userId],
          questions: questionsArr
        }
      }
    };
    case UPDATE_USER_ANSWERS:
      const uId = action.payload.authedUser;
      const option = action.payload.answer;

      return {
        ...state,
        users: {
          ...state.users,
          [uId]:{
            ...state.users[uId],
            answers: {
              questionId: option
            }
          }
        }
      };
    case UPDATE_USER_SCORE:
      const userid = action.payload;
      const newScore = state.users[userid].score + 1;

      return {
        ...state,
        users: {
          ...state.users,
          [userid]:{
          ...state.users[userid],
          score: newScore
          }
        }
      };
    default:
      return state;
}}

