import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkApi } from '@/entities/api/rtkApi';
import userReducer from '@/entities/slices/userSlice';

const reducers = combineReducers({
  [rtkApi.reducerPath]: rtkApi.reducer,
  user: userReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
