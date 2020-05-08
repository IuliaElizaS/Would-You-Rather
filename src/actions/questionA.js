export const ADD_ANSWER_TO_STATE = "ADD_ANSWER_TO_STATE"
export const ADD_QUESTION_TO_STATE = "ADD_QUESTION_TO_STATE"
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION"


export const addAnswerToState = (answer) => ({
    type: "ADD_ANSWER_TO_STATE",
    payload: answer
});

export const addQuestionToState = (question) => ({
    type: "ADD_QUESTION_TO_STATE",
    payload: question
});

export const setCurrentQuestion = (questionId) => ({
    type: "SET_CURRENT_QUESTION",
    payload: questionId
});