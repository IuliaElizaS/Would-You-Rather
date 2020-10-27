import {_getUsers, _getQuestions,_saveQuestion, _saveQuestionAnswer} from '../utils/DATA';
import {addQuestionsToState, addQuestionToState} from '../actions/questionA';
import {addUsersToState, updateUserQuestions, updateUserScore} from '../actions/userA';

// populates the users state with data
export const setInitialUsersState = () => {
    const getUsers = _getUsers();
    return function (dispatch) {
        return getUsers
        .then((users) => {
            dispatch(addUsersToState(users));
        })
        .catch( err => {
            console.log(`error from setInitialUsersState is: ${err}`)
        })
    }
};

// populates the questions state with data
export const setInitialQuestionsState = () => {
    const getQuestions = _getQuestions();
    return function (dispatch) {
        return getQuestions
        .then((questions) => {
            dispatch(addQuestionsToState(questions));
        })
        .catch( err => {
            console.log(`error from setInitialQuestionsState is: ${err}`)
        })
    }
};

export const saveQuestion = (question) => {
    return function (dispatch) {
        return _saveQuestion(question)
        .then((response) => {
            dispatch(addQuestionToState(response));
            dispatch(updateUserQuestions(response));
        })
        .then(() => dispatch(updateUserScore(question.author)))
    }
};

export const saveAnswer = (answer) => {
    return function (dispatch) {
      return _saveQuestionAnswer(answer);
    }
};