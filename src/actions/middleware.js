import {_saveQuestion, _saveQuestionAnswer} from '../utils/DATA'
import {addAnswerToState, addQuestionToState} from './questionA'
import {updateUserQuestions, updateUserAnswers, updateUserScore} from './userA'


export const saveQuestion = (question) => {
    return function (dispatch) {
        return _saveQuestion(question)
        .then((response) => {
            dispatch(addQuestionToState(response)),
            dispatch(updateUserQuestions(response));
        })
        .then(() => dispatch(updateUserScore(question.author)))
    }
};

export const saveAnswer = (answer) => {
    return function (dispatch) {  
        return _saveQuestionAnswer(answer)
        .then(() => {
            dispatch(addAnswerToState(answer));
            dispatch(updateUserAnswers(answer));
            dispatch(updateUserScore(answer.authedUser))
        })
    }
}