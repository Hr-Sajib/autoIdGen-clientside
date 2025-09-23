import baseApi from "@/lib/api/baseApi";

export const cardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createCard: builder.mutation({
            query: (newCard) => ({
                url: "/card",
                method: "POST",
                body: newCard,
            }),
            invalidatesTags: ["Card"],
        }),

        getCardByBatchId: builder.query({
            query: (batchId: string) => ({
                url: `/card/batch/${batchId}`,
                method: "GET",
            }),
            providesTags: ["Card"],
        }),

        updateCard: builder.mutation({
            query: ({ id, data }) => ({
                url: `/card/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Card"],
        }),

        // getProject: builder.query({
        //     query: () => "/project",
        //     providesTags: ["Card"],
        // }),

        // getMyProject: builder.query({
        //     query: () => ({
        //         url: "/project/getMyProjects",
        //         method: "GET",
        //     }),
        //     providesTags: ["Card"],
        // }),

        // getSpecificProject: builder.query({
        //     query: (id) => ({
        //         url: `/project/${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["Card"],
        // }),

        deleteCard: builder.mutation({
            query: (id) => ({
                url: `/card/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Card"],
        })
    }),
});

export const {
    useCreateCardMutation,    
    useGetCardByBatchIdQuery,
    useUpdateCardMutation,
    // useCreateProjectMutation,
    // useGetMyProjectQuery,
    // useGetSpecificProjectQuery,
    useDeleteCardMutation,
} = cardApi;
