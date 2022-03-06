import {
    sendRequest
} from 'helpers/requestHelper';

async function register(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user`,
        method: 'POST',
        data
    }, true, true)
}

async function updateUser(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function getUserDetail(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'GET',
    }, false, true)
}

async function updatePassword(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/change-password/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function getAllUsers(queryData) {
    console.log("queryData", queryData);
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function deleteUser(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'DELETE',
    }, true, true)
}

async function getPostsOwner(id, query) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/posts-owner/${id}`,
        method: 'GET',
        params: query
    }, false, true)
}

export const UserApi = {
    register,
    updateUser,
    getUserDetail,
    updatePassword,
    getAllUsers,
    deleteUser,
    getPostsOwner
};