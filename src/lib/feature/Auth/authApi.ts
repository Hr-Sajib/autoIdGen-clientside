// import baseApi from "@/lib/api/baseApi";

// const authApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         logIn: builder.mutation({
//             query: ({ email, password }) => ({
//                 url: "/auth/login",
//                 method: "POST",
//                 body: { email, password },
//             }),

//         }),

//         register: builder.mutation({
//             query: (formData) => ({
//                 url: "/user",
//                 method: "POST",
//                 body: formData,
//             }),
//         }),

//         forgatPassword: builder.mutation({
//             query: ({ email, password }) => {
//                 return {
//                     url: "/auth/forgot-password",
//                     method: "POST",
//                     body: { email, password }
//                 };
//             },
//         }),

//         resetPassword: builder.mutation({
//             query: ({ userId, token, password }) => ({
//                 url: "/auth/reset-password",
//                 method: "POST",
//                 headers: {
//                     'Authorization': token,
//                 },
//                 body: {
//                     id: userId,
//                     password: password
//                 },
//             }),
//         }),

//         getMeUser: builder.query({
//             query: () => ({
//                 url: "/auth/get-me",
//                 method: "GET",

//             }),

//         }),

//         changePassword: builder.mutation({
//             query: (data) => ({
//                 url: "/auth/change-password",
//                 method: "POST",
//                 body: data,
//             }),
//         }),


//     }),
//     overrideExisting: true,
// });

// export const { 
//     useLogInMutation,
//     useRegisterMutation,
//     useForgatPasswordMutation,
//     useGetMeUserQuery,
//     useChangePasswordMutation,
//     useResetPasswordMutation } = authApi;







import baseApi from "@/lib/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ✅ Login endpoint - existing
        logIn: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password },
            }),
        }),

        // ✅ Register endpoint - existing
        register: builder.mutation({
            query: (formData) => ({
                url: "/user",
                method: "POST",
                body: formData,
            }),
        }),

        // ✅ Old forgot password endpoint - existing (kept for backward compatibility)
        forgatPassword: builder.mutation({
            query: ({ email, password }) => {
                return {
                    url: "/auth/forgot-password",
                    method: "POST",
                    body: { email, password }
                };
            },
        }),

        // ✅ Old reset password endpoint - existing (kept for backward compatibility)
        resetPassword: builder.mutation({
            query: ({ userId, token, password }) => ({
                url: "/auth/reset-password",
                method: "POST",
                headers: {
                    'Authorization': token,
                },
                body: {
                    id: userId,
                    password: password
                },
            }),
        }),

        // ✅ NEW: Send OTP for password reset
        sendResetOtp: builder.mutation({
            query: ({ email }) => ({
                url: "/user/send-reset-otp",
                method: "POST",
                body: { email },
            }),
        }),

        // ✅ NEW: Reset password with OTP confirmation
        resetPasswordOtp: builder.mutation({
            query: ({ email, otp, newPassword }) => ({
                url: "/user/reset-password-otp",
                method: "POST",
                body: { 
                    email, 
                    otp,
                    newPassword 
                },
            }),
        }),

        // ✅ Get current user - existing
        getMeUser: builder.query({
            query: () => ({
                url: "/auth/get-me",
                method: "GET",
            }),
        }),

        // ✅ Change password - existing
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
    overrideExisting: true,
});

// ✅ Export all hooks including new ones
export const { 
    useLogInMutation,
    useRegisterMutation,
    useForgatPasswordMutation,
    useGetMeUserQuery,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useSendResetOtpMutation,        // ✅ NEW: Hook for sending OTP
    useResetPasswordOtpMutation,    // ✅ NEW: Hook for resetting password with OTP
} = authApi;