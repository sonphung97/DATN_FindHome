import { CategoryApi } from "./apiRequests";
import { CATEGORIES } from "./constants";

function createCategory(data) {
    return dispatch => {
        dispatch({ type: CATEGORIES.CATEGORY_ADD_REQUEST });
        CategoryApi.createCategory(data)
            .then(res => {
                dispatch({
                    type: CATEGORIES.CATEGORY_ADD_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.CATEGORY_ADD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllCategories(queryData) {
    return dispatch => {
        dispatch({ type: CATEGORIES.GET_ALL_CATEGORIES_REQUEST });
        CategoryApi.getAllCategories(queryData)
            .then(res => {
                dispatch({
                    type: CATEGORIES.GET_ALL_CATEGORIES_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.GET_ALL_CATEGORIES_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getDetailCategory(id) {
    return dispatch => {
        dispatch({ type: CATEGORIES.GET_DETAIL_CATEGORY_REQUEST });
        CategoryApi.getDetailCategory(id)
            .then(res => {
                dispatch({
                    type: CATEGORIES.GET_DETAIL_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.GET_DETAIL_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function updateCategory(id, data) {
    return dispatch => {
        dispatch({ type: CATEGORIES.UPDATE_CATEGORY_REQUEST });
        CategoryApi.updateCategory(id, data)
            .then(res => {
                dispatch({
                    type: CATEGORIES.UPDATE_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.UPDATE_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function deleteCategory(id) {
    return dispatch => {
        dispatch({ type: CATEGORIES.DELETE_CATEGORY_REQUEST });
        CategoryApi.deleteCategory(id)
            .then(res => {
                dispatch({
                    type: CATEGORIES.DELETE_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.DELETE_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllCategoriesNoPagination(queryData) {
    return dispatch => {
        dispatch({ type: CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_REQUEST });
        CategoryApi.getAllCategories(queryData)
            .then(res => {
                dispatch({
                    type: CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_FAIL, payload: err?.response?.data?.messages?.[0] });
        })
    }
}

export const CategoryActions = {
    createCategory,
    getAllCategories,
    getDetailCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesNoPagination
}
