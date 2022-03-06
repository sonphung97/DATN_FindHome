import { PAYMENTS } from "./constants";
import { PaymentApi } from "./apiRequest";

function getAllPayments (queryData) {
    return (dispatch) => {
        dispatch({
            type: PAYMENTS.GET_ALL_PAYMENTS_REQUEST
        })
        PaymentApi.getAllPayments(queryData)
        .then((res) => {
            dispatch({
                type: PAYMENTS.GET_ALL_PAYMENTS_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PAYMENTS.GET_ALL_PAYMENTS_FAIL,
                error
            })
        })
    }
}

function createPayment(data) {
    return dispatch => {
        dispatch({ type: PAYMENTS.CREATE_PAYMENT_REQUEST });
        PaymentApi.createPayment(data)
            .then(res => {
                dispatch({
                    type: PAYMENTS.CREATE_PAYMENT_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: PAYMENTS.CREATE_PAYMENT_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

export const PaymentActions = {
    createPayment,
    getAllPayments
}