import { CountryApi } from "./apiRequest";
import { COUNTRIES } from "./constants";

function getProvinces() {
    return dispatch => {
        dispatch({ type: COUNTRIES.GET_PROVINCES_REQUEST });
        CountryApi.getProvinces()
            .then(res => {

                dispatch({
                    type: COUNTRIES.GET_PROVINCES_SUCCESS,
                    payload: res.data?.content?.provinces
                })
            })
            .catch(err => {
                dispatch({ type: COUNTRIES.GET_PROVINCES_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getDistricts(queryData) {
    return dispatch => {
        dispatch({ type: COUNTRIES.GET_DISTRICTS_REQUEST });
        CountryApi.getDistricts(queryData)
            .then(res => {

                dispatch({
                    type: COUNTRIES.GET_DISTRICTS_SUCCESS,
                    payload: res.data?.content?.districts
                })
            })
            .catch(err => {
                dispatch({ type: COUNTRIES.GET_DISTRICTS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getWards(queryData) {
    return dispatch => {
        dispatch({ type: COUNTRIES.GET_WARDS_REQUEST });
        CountryApi.getWards(queryData)
            .then(res => {

                dispatch({
                    type: COUNTRIES.GET_WARDS_SUCCESS,
                    payload: res.data?.content?.wards
                })
            })
            .catch(err => {
                dispatch({ type: COUNTRIES.GET_WARDS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

export const CountryActions = {
    getProvinces,
    getDistricts,
    getWards
}
