import { AUTHENTICATIONS } from "./constants";
import { isEmpty } from "../../../helpers/isEmpty";

var initState = {
    user: {},
    isLoading: false,
    error: null,
    isAuth: false,
    currentRole: null
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AUTHENTICATIONS.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case AUTHENTICATIONS.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case AUTHENTICATIONS.LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload,
                currentRole: action.payload?.role,
                isLoading: false,
            }
        
        case AUTHENTICATIONS.SET_CURRENT_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: { ...state.user, ...action.payload },
                currentRole: action.payload.role
            };
          

        default:
            return {
                ...state
            };
    }
}