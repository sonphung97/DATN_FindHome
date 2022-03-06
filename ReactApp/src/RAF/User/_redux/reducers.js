import { USERS } from "./constants";

// helpers
import { findIndex } from 'helpers/global';
import { responseList } from "helpers/reducerHelper";

let initState = {
    profile: {},
    isLoading: false,
    error: null,
    isnewRegister: false,
}

export function user(state = initState, action) {
    let index;
    
    switch (action.type) {
        case USERS.REGISTER_REQUEST:
        case USERS.UPDATE_USER_REQUEST:
        case USERS.GET_USER_DETAIL_REQUEST:
        case USERS.CHANGE_PASSWORD_REQUEST:
        case USERS.GET_ALL_USERS_REQUEST:
        case USERS.DELETE_USER_REQUEST:
        case USERS.GET_POSTS_OWNER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case USERS.REGISTER_FAIL:
        case USERS.UPDATE_USER_FAIL:
        case USERS.GET_USER_DETAIL_FAIL:
        case USERS.CHANGE_PASSWORD_FAIL:
        case USERS.GET_ALL_USERS_FAIL:
        case USERS.DELETE_USER_FAIL:
        case USERS.GET_POSTS_OWNER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case USERS.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isnewRegister: true,
                profile: action.payload
            }

        case USERS.UPDATE_USER_SUCCESS:
            index = findIndex(state.listUsers, action.payload.user._id);
            if( index >= 0 ){
                // update list after update detail
                state.listUsers[index] = action.payload.user
            }
            return {
                ...state,
                isLoading: false
            }
        
        case USERS.GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                userDetail: action.payload.user,
                isLoading: false,
            }
            
        case USERS.CHANGE_PASSWORD_SUCCESS:
            index = findIndex(state.listUsers, action.payload.user._id);
            if( index >= 0 ){
                // update user after change info
                state.listUsers[index] = action.payload.user
            }
            return {
                ...state,
                isLoading: false
            }

        case USERS.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                ...responseList(action.payload, 'listUsers', 'allUsers')
            }
    
        case USERS.DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listUsers: state.listUsers.filter(u => u._id !== action.payload.user._id),
            }
    
        case USERS.GET_POSTS_OWNER_SUCCESS:
            return {
                ...state,
                ...responseList(action.payload, 'postsOwner', 'postsOwner')
            }

        default:
            return {
                ...state
            };
    }
}