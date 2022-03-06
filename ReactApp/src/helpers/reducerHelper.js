export const responseList = ( payload, listKey, responseKey ) => {
    return {
        isLoading: false,
        [listKey]: payload[responseKey].docs,
        totalDocs: payload[responseKey].totalDocs,
        limit: payload[responseKey].limit,
        totalPages: payload[responseKey].totalPages,
        page: payload[responseKey].page,
        pagingCounter: payload[responseKey].pagingCounter,
        hasPrevPage: payload[responseKey].hasPrevPage,
        hasNextPage: payload[responseKey].hasNextPage,
        prevPage: payload[responseKey].prevPage,
        nextPage: payload[responseKey].nextPage
    }
}