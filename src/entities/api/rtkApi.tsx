import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
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
  }),
});

export const { useGetPostsQuery, useGetSinglePostQuery, useRegisterUserMutation, useLoginUserMutation } = rtkApi;
