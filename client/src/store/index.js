/**
 * Application Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import appReducer from './features/app';

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
    }
});

export default store;