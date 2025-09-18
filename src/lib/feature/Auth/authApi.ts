import baseApi from "@/lib/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password },
            }),

        }),

        register: builder.mutation({
            query: (formData) => ({
                url: "/user",
                method: "POST",
                body: formData,
            }),
        }),

        forgatPassword: builder.mutation({
            query: ({ email, password }) => {
                return {
                    url: "/auth/forgot-password",
                    method: "POST",
                    body: { email, password }
                };
            },
        }),

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

        getMeUser: builder.query({
            query: () => ({
                url: "/auth/get-me",
                method: "GET",

            }),

        }),

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

export const { 
    useLogInMutation,
    useRegisterMutation,
    useForgatPasswordMutation,
    useGetMeUserQuery,
    useChangePasswordMutation,
    useResetPasswordMutation } = authApi;