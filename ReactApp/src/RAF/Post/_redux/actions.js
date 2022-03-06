import { postApi } from "./apiRequest";
import { POSTS } from "./constants";
import { UploadHelpers } from "helpers/upload";

function getAllPosts (queryData) {
    return (dispatch) => {
        dispatch({
            type: POSTS.GET_ALL_POSTS_REQUEST
        })
        postApi.getAllPosts(queryData)
        .then((res) => {
            dispatch({
                type: POSTS.GET_ALL_POSTS_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.GET_ALL_POSTS_FAIL,
                error
            })
        })
    }
}

function createPost(data) {
    return dispatch => {
        dispatch({ type: POSTS.CREATE_POST_REQUEST });
        postApi.createPost(data)
            .then(res => {
                dispatch({
                    type: POSTS.CREATE_POST_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: POSTS.CREATE_POST_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getPostDetailForUpdate(id){
    return (dispatch) => {
        dispatch({
            type: POSTS.GET_DETAIL_POST_FOR_UPDATE_REQUEST
        })
        postApi.getPostDetailForUpdate(id)
        .then((res) => {
            dispatch({
                type: POSTS.GET_DETAIL_POST_FOR_UPDATE_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.GET_DETAIL_POST_FOR_UPDATE_FAIL,
                error
            })
        })
    }
}

function updatePost(id, data){
    return (dispatch) => {
        dispatch({
            type: POSTS.UPDATE_POST_REQUEST
        })
        postApi.updatePost(id, data)
        .then((res) => {
            dispatch({
                type: POSTS.UPDATE_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.UPDATE_POST_FAIL,
                error
            })
        })
    }
}

function getPostDetail(id){
    return (dispatch) => {
        dispatch({
            type: POSTS.GET_DETAIL_POST_REQUEST
        })
        postApi.getPostDetail(id)
        .then((res) => {
            dispatch({
                type: POSTS.GET_DETAIL_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.GET_DETAIL_POST_FAIL,
                error
            })
        })
    }
}

function uploadAvatarAndImage (avatar, images) {
    return Promise.all([
        UploadHelpers.uploadMultiImages(avatar),
        UploadHelpers.uploadMultiImages(images)
    ])
        .then(res => {
            return {
                preview: res[0].imageLinks,
                images: res[1].imageLinks,
            }
        })
        .catch(err => {
            return {
                type: POSTS.UPLOAD_AVATAR_AND_IMAGE_FAIL,
                error: err
            }
        })
}

function requestUploading (){
    return dispatch => {
        dispatch({
            type: POSTS.UPLOAD_POST_IMAGE_REQUEST,
        })
    }
}

function deletePost(id){
    return (dispatch) => {
        dispatch({
            type: POSTS.DELETE_POST_REQUEST
        })
        postApi.deletePost(id)
        .then((res) => {
            dispatch({
                type: POSTS.DELETE_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.DELETE_POST_FAIL,
                error
            })
        })
    }
}

function comment(id, data){
    return (dispatch) => {
        dispatch({
            type: POSTS.COMMENT_REQUEST
        })
        postApi.comment(id, data)
        .then((res) => {
            dispatch({
                type: POSTS.COMMENT_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.COMMENT_FAIL,
                error
            })
        })
    }
}

function rate(id, data){
    return (dispatch) => {
        dispatch({
            type: POSTS.RATE_REQUEST
        })
        postApi.rate(id, data)
        .then((res) => {
            dispatch({
                type: POSTS.RATE_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.RATE_FAIL,
                error
            })
        })
    }
}

function follow(id, data){
    return (dispatch) => {
        dispatch({
            type: POSTS.FOLLOW_REQUEST
        })
        postApi.follow(id, data)
        .then((res) => {
            dispatch({
                type: POSTS.FOLLOW_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: POSTS.FOLLOW_FAIL,
                error
            })
        })
    }
}

export const PostActions = {
    createPost,
    uploadAvatarAndImage,
    requestUploading,
    getAllPosts,
    getPostDetail,
    getPostDetailForUpdate,
    updatePost,
    deletePost,
    comment,
    rate,
    follow
}
