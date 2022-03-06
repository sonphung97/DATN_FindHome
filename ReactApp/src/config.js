export const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('portal');
    return true;
};

export const setStorage = (name='token', value) => {
    return localStorage.setItem(name, value);
};

export const getStorage = (name='token') => {
    return localStorage.getItem(name);
}