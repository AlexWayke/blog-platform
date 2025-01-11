import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ArticleType, postsResponse } from '@/shared/types/articleType.ts';
import getPosts from '../api/getPosts.tsx';

export interface PostsState {
  posts: ArticleType[];
}

const initialState: PostsState = {
  posts: [],
};

export const fetchPosts = createAsyncThunk<postsResponse>('posts/fetchPosts', async () => {
  const response = await getPosts();

  return response;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.concat(action.payload.articles);
    });
  },
});

export default postsSlice.reducer;
