import { IntlReducer as Intl } from 'react-redux-multilingual';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';

import { auth } from 'RAF/Authentication/_redux/reducers';
import { user } from 'RAF/User/_redux/reducers';
import { country } from 'RAF/Country/_redux/reducers';
import { category } from 'RAF/Category/_redux/reducers';
import { postage } from 'RAF/Postage/_redux/reducers';
import { payment } from 'RAF/RechargeAndPayment/_redux/reducers';
import { post } from 'RAF/Post/_redux/reducers';

const appReducer = combineReducers({
    auth,
    user,
    country,
    category,
    postage,
    payment,
    post,
    Intl
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;