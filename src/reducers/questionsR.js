import {ADD_QUESTIONS_TO_STATE, ADD_ANSWER_TO_STATE, ADD_QUESTION_TO_STATE, SET_CURRENT_QUESTION} from '../actions/questionA';


export const questionsR = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUESTIONS_TO_STATE:
      console.log(action.payload, `initial state in questionsR is ${state}`);
      return {
        ...state,
        questions: action.payload
      };
    case ADD_ANSWER_TO_STATE:
      const { userId, questionId, option } = action.payload;
      let votesArr= state.questions[questionId][option].votes;
      votesArr.push(userId);
      return {
      ...state,
      questions: {
        ...state.questions,
        [questionId]:{
          ...state.questions[questionId],
          [option]:{
            ...state.questions[questionId][option],
            votes: votesArr
          }
        }
      }
    };
    case ADD_QUESTION_TO_STATE:
      const questId = action.payload.id;
      return {
        ...state,
        questions: {
          ...state.questions,
          [questId]: action.payload
        }
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.questions[action.payload],
        };
    default:
      return state;
  }
}
