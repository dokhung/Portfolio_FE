import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type AuthState = {
    isLoggedIn : boolean;
    nickName : string | null;
};

const initialState : AuthState = {
    isLoggedIn : false,
    nickName : null
};

const authSlice = createSlice({
    name: "todoAuth",
    initialState,
    reducers: {
        loginSuccess: (state: AuthState, action: PayloadAction<string>): void => {
            state.isLoggedIn = true;
            state.nickName = action.payload;
        },

        logoutSuccess: (state: AuthState): void => {
            state.isLoggedIn = false;
            state.nickName = null;
        }
    }
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;