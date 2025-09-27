// src/lib/api/analyticsApi.ts
import baseApi from "@/lib/api/baseApi";

// Define response types for each endpoint
export interface ProjectsCountResponse {
    data?: {count: number}
  success?: boolean
  message?: string
  count?: number
}

export interface GeneratedCardsResponse {
  data?:{count:number}
  message?: string;
  success?: boolean;
}

export interface PendingCardsResponse {
  data: { count: number };
  message?: string;
  success?: boolean;
}

export interface SubmissionsResponse {
  data: { count: number };
  message?: string;
  success?: boolean;    
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsCount: builder.query<ProjectsCountResponse, void>({
      query: () => ({
        url: "/analytics/projects/count",
        method: "GET",
      }),
    }),

    getGeneratedCards: builder.query<GeneratedCardsResponse, void>({
      query: () => ({
        url: "/analytics/cards/generated",
        method: "GET",
      }),
    }),

    getPendingCards: builder.query<PendingCardsResponse, void>({
      query: () => ({
        url: "/analytics/cards/pending",
        method: "GET",
      }),
    }),

    getSubmissions: builder.query<SubmissionsResponse, void>({
      query: () => ({
        url: "/analytics/cards/submissions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProjectsCountQuery,
  useGetGeneratedCardsQuery,
  useGetPendingCardsQuery,
  useGetSubmissionsQuery,
} = analyticsApi;
