/**
 * App Slice
 */

// Dependencies
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    snackbar: {
        message: '',
        severity: 'error', // error, warning, info, success
        open: false,
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showLoading: (state, action) => {
            // Action Payload - boolean
            state.isLoading = action.payload;
        },
        showSnackbar: (state, action) => {
            // Action Payload - object - {message: '', severity: ''}
            state.snackbar = { ...initialState.snackbar, ...action.payload, open: true };
        },
        hideSnackbar: (state, action) => {
            // Action Payload - none
            state.snackbar.open = false;
        },
    }
});

// Exporting Actions
export const { showLoading, showSnackbar, hideSnackbar } = appSlice.actions;

export default appSlice.reducer;