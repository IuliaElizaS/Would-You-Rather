import {ADD_QUESTIONS_TO_STATE, SET_WANTED_QUESTIONS_LIST, SET_QUESTIONS_LIST_STATUS, ADD_ANSWER_TO_STATE, ADD_QUESTION_TO_STATE, SET_CURRENT_QUESTION} from '../actions/questionA';


export const questionsR = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUESTIONS_TO_STATE:
      return {
        ...state,
        questions: action.payload
      };
    case SET_WANTED_QUESTIONS_LIST:
      return {
        ...state,
        wantedQuestionsList: action.payload
      };
    case ADD_ANSWER_TO_STATE:
      const userId = action.payload.authedUser;
      const questionId = action.payload.qid;
      const votedOption = action.payload.answer;

      return {
      ...state,
      questions: {
        ...state.questions,
        [questionId]:{
          ...state.questions[questionId],
          [votedOption]:{
            ...state.questions[questionId][votedOption],
            votes:[
              ...state.questions[questionId][votedOption].votes,
              userId
            ]
          }
        }
      }
    };
    case SET_QUESTIONS_LIST_STATUS:
      return {
        ...state,
        questionsListStatus: action.payload
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
