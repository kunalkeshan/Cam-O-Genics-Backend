/**
 * Application Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';

const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default store;