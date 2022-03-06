import { COUNTRIES } from "./constants";

var initState = {
    provincesData: [],
    districtsData: [],
    wardsData: [],
    isLoading: false,
    error: null,
}

export function country(state = initState, action) {
    switch (action.type) {
        case COUNTRIES.GET_PROVINCES_REQUEST:
        case COUNTRIES.GET_DISTRICTS_REQUEST:
        case COUNTRIES.GET_WARDS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case COUNTRIES.GET_PROVINCES_FAIL:
        case COUNTRIES.GET_DISTRICTS_FAIL:
        case COUNTRIES.GET_WARDS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case COUNTRIES.GET_PROVINCES_SUCCESS:
            return {
                ...state,
                provincesData: action.payload,
                districtsData: [],
                wardsData: [],
                isLoading: false,
            }
        
        case COUNTRIES.GET_DISTRICTS_SUCCESS:
            return {
                ...state,
                districtsData: action.payload,
                wardsData: [],
                isLoading: false,
        }
        
        case COUNTRIES.GET_WARDS_SUCCESS:
            return {
                ...state,
                wardsData: action.payload,
                isLoading: false,
            }

        default:
            return {
                ...state
            };
    }
}