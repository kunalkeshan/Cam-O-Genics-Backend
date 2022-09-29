/**
 * Custom Utilities
 */

export const getUserFromStorage = () => {
    try {
        const user = localStorage.getItem('cogcUser') ? JSON.parse(localStorage.getItem('cogcUser')) : null;
        if (typeof user === 'object') return user;
        else throw new Error();
    } catch (error) {
        return null;
    }
}