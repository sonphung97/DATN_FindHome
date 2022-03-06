import { CATEGORIES } from "./constants";

import { responseList } from "helpers/reducerHelper";

var initState = {
    categoryDetail: {},
    listCategories: [],
    listCategoriesNoPagination: [],
    isLoading: false,
    error: null,
}

export function category(state = initState, action) {

    switch (action.type) {
        case CATEGORIES.CATEGORY_ADD_REQUEST:
        case CATEGORIES.GET_ALL_CATEGORIES_REQUEST:
        case CATEGORIES.GET_DETAIL_CATEGORY_REQUEST:
        case CATEGORIES.UPDATE_CATEGORY_REQUEST:
        case CATEGORIES.DELETE_CATEGORY_REQUEST:
        case CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case CATEGORIES.CATEGORY_ADD_FAIL:
        case CATEGORIES.GET_ALL_CATEGORIES_FAIL:
        case CATEGORIES.GET_DETAIL_CATEGORY_FAIL:
        case CATEGORIES.UPDATE_CATEGORY_FAIL:
        case CATEGORIES.DELETE_CATEGORY_FAIL:
        case CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case CATEGORIES.CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                listCategories: [action.payload.category, ...state.listCategories],
                isLoading: false,
            }
        
        case CATEGORIES.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...responseList(action.payload, 'listCategories', 'allCategories')
            }
        
        case CATEGORIES.GET_DETAIL_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryDetail: action.payload.category,
                isLoading: false,
            }
        
        case CATEGORIES.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                listCategories: state.listCategories.map((c) => {
                    if (action.payload.category._id !== c._id) return c;
                    return action.payload.category;
                }),
                isLoading: false,
            }
        
        case CATEGORIES.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                listCategories: state.listCategories.filter(c => c._id !== action.payload.category._id),
                isLoading: false,
            }
        
        case CATEGORIES.GET_ALL_CATEGORIES_NO_PAGINATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listCategoriesNoPagination: action.payload.allCategories,
            }
            
        
        default:
            return {
                ...state
            };
    }
}