import { sendRequest } from 'helpers/requestHelper';

async function getAllPosts(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post`,
        method: 'GET',
        params: queryData
    }, false, false)
}

async function createPost(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post`,
        method: 'POST',
        data
    }, true, true)
}

async function getPostDetailForUpdate(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/get-for-update/${id}`,
        method: 'GET'
    }, false, true)
}

async function updatePost(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function getPostDetail(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'GET'
    }, false, true)
}

async function comment(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/comment/${id}`,
        method: 'PATCH',
        data
    }, false, true)
}

async function rate(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/rate/${id}`,
        method: 'PATCH',
        data
    }, false, true)
}

async function follow(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/follow/${id}`,
        method: 'PATCH',
        data
    }, false, true)
}

async function deletePost(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'DELETE'
    }, true, true)
}

export const postApi = {
    getAllPosts,
    createPost,
    getPostDetailForUpdate,
    updatePost,
    getPostDetail,
    deletePost,
    comment,
    rate,
    follow
};