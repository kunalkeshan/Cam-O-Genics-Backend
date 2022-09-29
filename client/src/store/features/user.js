/**
 * User Slice
 */

// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import { getUserFromStorage } from "../../utils/custom";

const initialState = {
    user: getUserFromStorage(),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('cogcUser', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('cogcUser');
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;