// import { TUser } from "@/types/inedx";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthSate {
//     user: TUser | null;
//     accessToken: string | null;
//     isAuthenticated: boolean;
//     isLoading?: boolean;
// }

// const initialState: AuthSate = {
//     user: null,
//     accessToken: null,
//     isAuthenticated: false,
//     isLoading: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser(state, action: PayloadAction<{ user: TUser; accessToken: string }>) {
//             state.user = action.payload.user;
//             state.isAuthenticated = !!action.payload.user;
//             state.isLoading = false;
//             state.accessToken = action.payload.accessToken;
//         },
//         setAccessToken(state, action: { payload: string }) {
//             state.accessToken = action.payload;
//         },
//         setIsLoading(state, action: { payload: boolean }) {
//             state.isLoading = action.payload;
//         },
//         logout(state) {
//             state.user = null;
//             state.accessToken = null;
//             state.isAuthenticated = false;
//             localStorage.removeItem('token')
//         },
//     },
// });

// export const { setUser, setAccessToken, setIsLoading, logout } = authSlice.actions;

// export default authSlice.reducer;



//? kaka theke pailam

import { TUser } from "@/types/inedx";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

// 🔹 localStorage থেকে token get করা
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
console.log("Initial token from localStorage:", token);

// 🔹 যদি token থাকে, decode করে user বের করা
const userFromStorage = token ? jwtDecode<TUser>(token) : null;


interface AuthSate {
    user: TUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
}

const initialState: AuthSate = {
    user: userFromStorage,
    accessToken: token,
    isAuthenticated: !!userFromStorage,
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
            localStorage.setItem("token", action.payload.accessToken); // token save
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
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, setAccessToken, setIsLoading, logout } = authSlice.actions;

export default authSlice.reducer;
