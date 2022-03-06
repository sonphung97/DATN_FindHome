import {
    sendRequest
} from 'helpers/requestHelper';

async function createPayment(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/payment`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllPayments(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/payment`,
        method: 'GET',
        params: queryData
    }, false, false)
}

export const PaymentApi = {
    createPayment,
    getAllPayments
};
