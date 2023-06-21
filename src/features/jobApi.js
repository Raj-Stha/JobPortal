import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../constant/Constant";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getHomepage: builder.query({
      query: (query) => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    addJobPost: builder.mutation({
      query: (query) => ({
        url: "/api/add-jobs",
        method: "POST",
        headers: {
          Authorization: query.token,
        },
        body: query.details,
      }),
      invalidatesTags: ["Job"],
    }),

    getCreatedJob: builder.query({
      query: (query) => ({
        url: "/api/get-created-job",
        method: "GET",
        headers: {
          Authorization: query,
        },
      }),
      providesTags: ["Job"],
    }),
    getSingleJobDetail: builder.query({
      query: (query) => ({
        url: `/api/get-single-job/${query.id}`,
        method: "GET",
        headers: {
          Authorization: query.token,
        },
      }),
      providesTags: ["Job"],
    }),

    updateJobPost: builder.mutation({
      query: (query) => ({
        url: "/api/update-job",
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
        body: query.details,
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJobPost: builder.mutation({
      query: (query) => ({
        url: "/api/delete-job",
        method: "POST",
        headers: {
          Authorization: query.token,
        },
        body: query.jobID,
      }),
      invalidatesTags: ["Job"],
    }),

    getJobByCompany: builder.query({
      query: (query) => ({
        url: "/api/get-job-by-company",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    getJobByCategory: builder.query({
      query: (query) => ({
        url: "/api/get-categories-job",
        method: "GET",
        params: {
          category: query,
        },
      }),
      providesTags: ["Job"],
    }),

    getJobDetail: builder.query({
      query: (query) => ({
        url: "/api/get-job-detail",
        method: "GET",
        params: {
          jobID: query.id,
          clientToken: query.token.token,
        },
      }),
      providesTags: ["Job"],
    }),

    updateUserAndJob: builder.mutation({
      query: (query) => ({
        url: "/api/client/update-jobs",
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
        body: query.form,
      }),
      invalidatesTags: ["Job"],
    }),

    getSearchedJob: builder.query({
      query: (query) => ({
        url: "/api/search-job",
        method: "GET",
        params: {
          jobTitle: query,
        },
      }),
      providesTags: ["Job"],
    }),
  }),
});

export const {
  useAddJobPostMutation,
  useGetCreatedJobQuery,
  useGetSingleJobDetailQuery,
  useUpdateJobPostMutation,
  useDeleteJobPostMutation,
  useGetJobByCompanyQuery,
  useGetJobByCategoryQuery,
  useGetJobDetailQuery,
  useUpdateUserAndJobMutation,
  useGetHomepageQuery,
  useGetSearchedJobQuery,
} = jobApi;
