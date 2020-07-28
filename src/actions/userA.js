export const SET_LOGED_IN_USER = "SET_LOGED_IN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const ADD_SCORE_TO_USER_OBJ = "ADD_SCORE_TO_USER_OBJ";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";
export const UPDATE_USER_SCORE = "UPDATE_USER_SCORE";
export const ADD_USERS_TO_STATE = "ADD_USERS_TO_STATE"

export const addUsersToState = (users) => ({
    type: "ADD_USERS_TO_STATE",
    payload: users
});

export const setLogedInUser = (userId) => ({
    type: SET_LOGED_IN_USER,
    payload: userId
});

export const logOutUser = () => ({
    type: LOG_OUT_USER,
    payload: {},
});

export const addScoreToUserObj = (users) => ({
    type: ADD_SCORE_TO_USER_OBJ,
    payload: users,
});

export const updateUserAnswers = (answer) => ({
    type: UPDATE_USER_ANSWERS,
    payload: answer
});

export const updateUserQuestions = (question) => ({
    type: UPDATE_USER_QUESTIONS,
    payload: question
});

export const updateUserScore = (userId) => ({
    type: UPDATE_USER_SCORE,
    payload: userId
});