function create(data, apiRequest, requestType, successType, failType){
     return (dispatch) => {
        dispatch({
            type: requestType
        })
        apiRequest(data)
        .then((res) => {
            dispatch({
                type: successType,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: failType,
                error
            })
        })
    }
}

function getLists (queryData, apiRequest, requestType, successType, failType) {
    return (dispatch) => {
        dispatch({
            type: requestType
        })
        apiRequest(queryData)
        .then((res) => {
            dispatch({
                type: successType,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: failType,
                error
            })
        })
    }
}

function getDetail(id, apiRequest, requestType, successType, failType){
    return (dispatch) => {
        dispatch({
            type: requestType
        })
        apiRequest(id)
        .then((res) => {
            dispatch({
                type: successType,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: failType,
                error
            })
        })
    }
}

function update(id, data, apiRequest, requestType, successType, failType){
    return (dispatch) => {
        dispatch({
            type: requestType
        })
        apiRequest(id, data)
        .then((res) => {
            dispatch({
                type: successType,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: failType,
                error
            })
        })
    }
}

function remove (id, apiRequest, requestType, successType, failType){
    return (dispatch) => {
        dispatch({
            type: requestType
        })
        apiRequest(id)
        .then((res) => {
            dispatch({
                type: successType,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: failType,
                error
            })
        })
    }
}

export const actionHelpers = {
    create,
    getLists,
    getDetail,
    update,
    remove
}
