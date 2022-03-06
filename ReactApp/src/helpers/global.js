export const findIndex = (array, id) => {
    let result = -1;
    array.forEach((value, index) => {
        if (value._id === id) {
            result = index;
        }
    });
    return result;
}

export const averageRating = (rates) => {
    if (!rates?.length) return 0;
    let total = rates.reduce((a, b) => {
        return a + b.rate;
    }, 0)
    return total / rates.length;
}

const randomKey = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

export const createItemKey = () => {
    return randomKey() + "-" + 
    randomKey() + '-' + 
    randomKey() + '-' + 
    randomKey() + '-' + 
    randomKey() + '-' + 
    randomKey() + "-" + 
    randomKey()
}