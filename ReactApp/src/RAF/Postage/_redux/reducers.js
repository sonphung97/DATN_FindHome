import { POSTAGE } from "./constants";

var initState = {
    postageDetail: {},
    listPostages: [],
    isLoading: false,
    error: null,
}

export function postage(state = initState, action) {

    switch (action.type) {
        case POSTAGE.CREATE_POSTAGE_REQUEST:
        case POSTAGE.GET_ALL_POSTAGES_REQUEST:
        case POSTAGE.DELETE_POSTAGE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case POSTAGE.CREATE_POSTAGE_FAIL:
        case POSTAGE.GET_ALL_POSTAGES_FAIL:
        case POSTAGE.DELETE_POSTAGE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case POSTAGE.CREATE_POSTAGE_SUCCESS:
            return {
                ...state,
                postageDetail: action.payload.postage,
                listPostages: [action.payload.postage, ...state.listPostages],
                isLoading: false,
            }
        
        case POSTAGE.GET_ALL_POSTAGES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPostages: action.payload.allPostages.docs,
                totalDocs: action.payload.allPostages.totalDocs,
                limit: action.payload.allPostages.limit,
                totalPages: action.payload.allPostages.totalPages,
                page: action.payload.allPostages.page,
                pagingCounter: action.payload.allPostages.pagingCounter,
                hasPrevPage: action.payload.allPostages.hasPrevPage,
                hasNextPage: action.payload.allPostages.hasNextPage,
                prevPage: action.payload.allPostages.prevPage,
                nextPage: action.payload.allPostages.nextPage
            }
        
        case POSTAGE.DELETE_POSTAGE_SUCCESS:
            return {
                ...state,
                listPostages: state.listPostages.filter(u => u._id !== action.payload.postage._id),
                isLoading: false,
            }
    
        default:
            return {
                ...state
            };
    }
}