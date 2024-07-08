export const parseToken = (accessToken) => {
    try {
        return JSON.parse(atob(accessToken.split('.')[1]));
    } catch (e) {
        return null;
    }
};