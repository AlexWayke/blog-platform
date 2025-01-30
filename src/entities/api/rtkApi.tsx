import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RootState {
  user: {
    user: {
      token: string;
    };
  };
}

export const rtkApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.user?.token;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
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
      providesTags: ['post'],
    }),
    getSinglePost: build.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
    createArticle: build.mutation({
      query: ({ article }) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article,
        },
      }),
      invalidatesTags: ['post'],
    }),
    editArticle: build.mutation({
      query: ({ article, slug }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: {
          article,
        },
      }),
    }),
    deleteArticle: build.mutation({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['post'],
    }),
    favoriteArticle: build.mutation({
      query: ({ slug, favorited }) => ({
        url: `/articles/${slug}/favorite`,
        method: favorited ? 'DELETE' : 'POST',
      }),
      invalidatesTags: ['post'],
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
      query: ({ user }) => ({
        url: '/user',
        method: 'PUT',
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
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = rtkApi;
