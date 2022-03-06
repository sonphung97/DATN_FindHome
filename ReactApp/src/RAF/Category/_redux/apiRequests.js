import {
    sendRequest
} from 'helpers/requestHelper';

async function createCategory(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/category`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllCategories(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/category`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getDetailCategory(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/category/${id}`,
        method: 'GET'
    }, false, true)
}

async function updateCategory(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/category/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function deleteCategory(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/category/${id}`,
        method: 'DELETE'
    }, true, true)
}

export const CategoryApi = {
    createCategory,
    getAllCategories,
    getDetailCategory,
    updateCategory,
    deleteCategory
};
