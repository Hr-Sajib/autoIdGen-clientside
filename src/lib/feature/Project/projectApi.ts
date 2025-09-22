import baseApi from "@/lib/api/baseApi";

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createProject: builder.mutation({
            query: (newEmployee) => ({
                url: "/project",
                method: "POST",
                body: newEmployee,
            }),
            invalidatesTags: ["Project"],
        }),

        getProject: builder.query({
            query: () => "/project",
            providesTags: ["Project"],
        }),

        getMyProject: builder.query({
            query: () => ({
                url: "/project/getMyProjects",
                method: "GET",
            }),
            providesTags: ["Project"],
        })
    }),
});

export const {
    useGetProjectQuery,
    useCreateProjectMutation,
    useGetMyProjectQuery,
} = projectApi;
