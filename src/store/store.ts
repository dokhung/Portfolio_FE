import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../components/todolist/store/authSlice";
export const store = configureStore({
    reducer: {
        todoAuth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;