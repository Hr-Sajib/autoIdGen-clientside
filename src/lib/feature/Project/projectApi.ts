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
        }),

        getSpecificProject: builder.query({
            query: (id) => ({
                url: `/project/${id}`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),

        updateProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/project/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }),

        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/project/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        })
    }),
});

export const {
    useGetProjectQuery,
    useCreateProjectMutation,
    useGetMyProjectQuery,
    useGetSpecificProjectQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi;
