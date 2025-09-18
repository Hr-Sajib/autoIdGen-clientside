import { TUser } from "@/types/inedx";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSate {
    user: TUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
}

const initialState: AuthSate = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: TUser; accessToken: string }>) {
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.user;
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
        },
        setAccessToken(state, action: { payload: string }) {
            state.accessToken = action.payload;
        },
        setIsLoading(state, action: { payload: boolean }) {
            state.isLoading = action.payload;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('access_token')
        },
    },
});

export const { setUser, setAccessToken, setIsLoading, logout } = authSlice.actions;

export default authSlice.reducer;