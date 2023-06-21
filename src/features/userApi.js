import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../constant/Constant";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    employeeRegister: builder.mutation({
      query: (query) => ({
        url: "/api/register-employee",
        method: "POST",
        body: query,
      }),
    }),

    clientRegister: builder.mutation({
      query: (query) => ({
        url: "/api/register-client",
        method: "POST",
        body: query,
      }),
    }),
    userLogin: builder.mutation({
      query: (query) => ({ url: "/api/login", method: "POST", body: query }),
    }),
    checkUserToken: builder.mutation({
      query: (query) => ({
        url: "/api/validateUser",
        method: "POST",
        body: query,
      }),
      providesTags: ["User"],
    }),

    getClientDetail: builder.query({
      query: (query) => ({
        url: "api/get-client-detail",
        method: "GET",
        headers: {
          Authorization: query,
        },
      }),
      providesTags: ["User"],
    }),

    updateUserForJOB: builder.mutation({
      query: (query) => ({
        url: "/api/client/update-User",
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
        body: query.form,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useEmployeeRegisterMutation,
  useClientRegisterMutation,
  useUserLoginMutation,
  useCheckUserTokenMutation,
  useGetClientDetailQuery,
  useUpdateUserForJOBMutation,
} = userApi;
