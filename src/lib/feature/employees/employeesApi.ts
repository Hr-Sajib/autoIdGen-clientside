import baseApi from "@/lib/api/baseApi";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      providesTags: ["Employees"],
    }),
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "/employees",
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation } = employeesApi;
