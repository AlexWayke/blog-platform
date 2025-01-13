import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '@/shared/api/getPosts';

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
