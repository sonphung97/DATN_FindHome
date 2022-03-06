import {
    sendRequest
} from 'helpers/requestHelper';

async function createPostage(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/postage`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllPostages(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/postage`,
        method: 'GET',
        params: queryData
    }, false, false)
}

async function deletePostage(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/postage/${id}`,
        method: 'DELETE'
    }, true, true)
}

export const postageApi = {
    createPostage,
    getAllPostages,
    deletePostage
};