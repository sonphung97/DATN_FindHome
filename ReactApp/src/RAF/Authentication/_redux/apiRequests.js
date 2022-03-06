import {
    sendRequest
} from '../../../helpers/requestHelper';

async function login(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/auth/login`,
        method: 'POST',
        data
    }, false, true)
}

export const AuthApi = {
    login
};