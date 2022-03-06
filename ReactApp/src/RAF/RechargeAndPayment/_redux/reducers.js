import { PAYMENTS } from "./constants";

var initState = {
    paymentDetail: {},
    listPayments: [],
    isLoading: false,
    error: null,
}

export function payment(state = initState, action) {
    switch (action.type) {
        case PAYMENTS.CREATE_PAYMENT_REQUEST:
        case PAYMENTS.GET_ALL_PAYMENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case PAYMENTS.CREATE_PAYMENT_FAIL:
        case PAYMENTS.GET_ALL_PAYMENTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case PAYMENTS.GET_ALL_PAYMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalDocs: action.payload.allPayments.totalDocs,
                listPayments: action.payload.allPayments.docs,
                totalPages: action.payload.allPayments.totalPages,
                limit: action.payload.allPayments.limit,
                pagingCounter: action.payload.allPayments.pagingCounter,
                page: action.payload.allPayments.page,
                hasNextPage: action.payload.allPayments.hasNextPage,
                hasPrevPage: action.payload.allPayments.hasPrevPage,
                nextPage: action.payload.allPayments.nextPage,
                prevPage: action.payload.allPayments.prevPage
            }

        case PAYMENTS.CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                paymentDetail: action.payload.payment,
                listPayments: [action.payload.payment, ...state.listPayments],
                isLoading: false,
            }
    
        default:
            return {
                ...state
            };
    }
}