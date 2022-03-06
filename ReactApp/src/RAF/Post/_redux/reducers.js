import { POSTS } from "./constants";
import { findIndex } from 'helpers/global';
import { responseList } from "helpers/reducerHelper";

var initState = {
    listPosts: [],
    postCreated: {},
    postForUpdate: {},
    postDetail: {},
    postDeleted: {},
    isLoading: false,
    error: null,
}

export function post(state = initState, action) {
    let index = -1;

    switch (action.type) {
        case POSTS.GET_ALL_POSTS_REQUEST:
        case POSTS.UPLOAD_POST_IMAGE_REQUEST:
        case POSTS.CREATE_POST_REQUEST:
        case POSTS.GET_DETAIL_POST_FOR_UPDATE_REQUEST:
        case POSTS.UPDATE_POST_REQUEST:
        case POSTS.GET_DETAIL_POST_REQUEST:
        case POSTS.DELETE_POST_REQUEST:
        case POSTS.COMMENT_REQUEST:
        case POSTS.RATE_REQUEST:
        case POSTS.FOLLOW_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case POSTS.GET_ALL_POSTS_FAIL:
        case POSTS.CREATE_POST_FAIL:
        case POSTS.GET_DETAIL_POST_FOR_UPDATE_FAIL:
        case POSTS.UPDATE_POST_FAIL:
        case POSTS.GET_DETAIL_POST_FAIL:
        case POSTS.DELETE_POST_FAIL:
        case POSTS.COMMENT_FAIL:
        case POSTS.RATE_FAIL:
        case POSTS.FOLLOW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case POSTS.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                ...responseList(action.payload, 'listPosts', 'allPosts')
            }
        
        case POSTS.CREATE_POST_SUCCESS:
            return {
                ...state,
                postCreated: action.payload.post,
                isLoading: false,
            }
        
        case POSTS.GET_DETAIL_POST_FOR_UPDATE_SUCCESS:
            return {
                ...state,
                postForUpdate: action.payload.post,
                isLoading: false,
            }
        
        case POSTS.UPDATE_POST_SUCCESS:
            index = findIndex(state.listPosts, action.payload.post._id);
            if(index !== -1){
                state.listPosts[index] = action.payload.post
            }
            return {
                ...state,
                postForUpdate: action.payload.post,
                isLoading: false,
            }
        
        case POSTS.GET_DETAIL_POST_SUCCESS:
            return {
                ...state,
                postDetail: action.payload.post,
                isLoading: false,
            }

        case POSTS.DELETE_POST_SUCCESS:
            return {
                ...state,
                postDeleted: action.payload.post,
                isLoading: false,
            }

        case POSTS.COMMENT_SUCCESS:
        case POSTS.RATE_SUCCESS:
        case POSTS.FOLLOW_SUCCESS:
            return {
                ...state,
                postDetail: action.payload.post,
                isLoading: false,
            }

        default:
            return {
                ...state
            };
    }
}