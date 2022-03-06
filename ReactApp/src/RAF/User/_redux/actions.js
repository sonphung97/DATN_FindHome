import { UserApi } from "./apiRequests";
import { USERS } from "./constants";

function register(user) {
    return dispatch => {
        dispatch({ type: USERS.REGISTER_REQUEST });
        UserApi.register(user)
            .then(res => {
                dispatch({
                    type: USERS.REGISTER_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: USERS.REGISTER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function updateUser(id, data) {
    return dispatch => {
        dispatch({ type: USERS.UPDATE_USER_REQUEST });
        UserApi.updateUser(id, data)
            .then(res => {
                dispatch({
                    type: USERS.UPDATE_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.UPDATE_USER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getUserDetail(id) {
    return dispatch => {
        dispatch({ type: USERS.GET_USER_DETAIL_REQUEST });
        UserApi.getUserDetail(id)
            .then(res => {
                dispatch({
                    type: USERS.GET_USER_DETAIL_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.GET_USER_DETAIL_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function updatePassword(id, data) {
    return dispatch => {
        dispatch({ type: USERS.CHANGE_PASSWORD_REQUEST });
        UserApi.updatePassword(id, data)
            .then(res => {
                dispatch({
                    type: USERS.CHANGE_PASSWORD_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.CHANGE_PASSWORD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllUsers(queryData) {
    return dispatch => {
        dispatch({ type: USERS.GET_ALL_USERS_REQUEST });
        UserApi.getAllUsers(queryData)
            .then(res => {
                dispatch({
                    type: USERS.GET_ALL_USERS_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.GET_ALL_USERS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function deleteUser(id) {
    return dispatch => {
        dispatch({ type: USERS.DELETE_USER_REQUEST });
        UserApi.deleteUser(id)
            .then(res => {
                dispatch({
                    type: USERS.DELETE_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.DELETE_USER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getPostsOwner(id, query) {
    return dispatch => {
        dispatch({ type: USERS.GET_POSTS_OWNER_REQUEST });
        UserApi.getPostsOwner(id, query)
            .then(res => {
                dispatch({
                    type: USERS.GET_POSTS_OWNER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: USERS.GET_POSTS_OWNER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

export const UserActions = {
    register,
    updateUser,
    getUserDetail,
    updatePassword,
    getAllUsers,
    deleteUser,
    getPostsOwner
}
