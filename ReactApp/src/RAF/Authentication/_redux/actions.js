// helpers
import { AuthApi } from "./apiRequests";
import { setStorage, clearStorage } from '../../../config';

// redux
import store from '../../../redux/store';

// constants
import { AUTHENTICATIONS } from "./constants";

function login(user) {
    return dispatch => {
        dispatch({ type: AUTHENTICATIONS.LOGIN_REQUEST });
        AuthApi.login(user)
            .then(res => {
                setStorage('token', res.data?.content?.token);
                setStorage('userId', res.data?.content?.user?._id);

                dispatch({
                    type: AUTHENTICATIONS.LOGIN_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: AUTHENTICATIONS.LOGIN_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function setCurrentUser (decoded) {
    return {
        type: AUTHENTICATIONS.SET_CURRENT_USER,
        payload: decoded,
    };
};

function logOut () {
    store.dispatch(setCurrentUser({}));
    clearStorage();
    // window.location.href = "/";
}

export const AuthActions = {
    login,
    setCurrentUser,
    logOut
}