import { POSTAGE } from "./constants";
import { postageApi } from "./apiRequests";

function createPostage(data) {
    return dispatch => {
        dispatch({ type: POSTAGE.CREATE_POSTAGE_REQUEST });
        postageApi.createPostage(data)
            .then(res => {
                dispatch({
                    type: POSTAGE.CREATE_POSTAGE_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: POSTAGE.CREATE_POSTAGE_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllPostages (queryData) {
    return (dispatch) => {
        dispatch({
            type: POSTAGE.GET_ALL_POSTAGES_REQUEST
        })

        postageApi.getAllPostages(queryData)
        .then((res) => {
            dispatch({
                type: POSTAGE.GET_ALL_POSTAGES_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTAGE.GET_ALL_POSTAGES_FAIL,
                error
            })
        })
    }
}

function deletePostage (id) {
    return (dispatch) => {
        dispatch({
            type: POSTAGE.DELETE_POSTAGE_REQUEST
        })

        postageApi.deletePostage(id)
        .then((res) => {
            dispatch({
                type: POSTAGE.DELETE_POSTAGE_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTAGE.DELETE_POSTAGE_FAIL,
                error
            })
        })
    }
}


export const PostageActions = {
    createPostage,
    getAllPostages,
    deletePostage
}