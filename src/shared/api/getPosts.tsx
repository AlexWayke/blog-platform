import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
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
  }),
});

export const { useGetPostsQuery, useGetSinglePostQuery } = blogApi;
