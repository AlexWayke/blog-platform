import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getPosts: build.query({
      query: (offset = 0) => ({
        url: '/articles',
        params: {
          offset: offset,
          limit: 10,
        },
      }),
    }),
    getSinglePost: build.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
    createArticle: build.mutation({
      query: ({ token, article }) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: {
          article,
        },
      }),
    }),
    registerUser: build.mutation({
      query: ({ username, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: {
          user: {
            username,
            email,
            password,
          },
        },
      }),
    }),
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email,
            password,
          },
        },
      }),
    }),
    editUser: build.mutation({
      query: ({ token, user }) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: {
          user,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useCreateArticleMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = rtkApi;
