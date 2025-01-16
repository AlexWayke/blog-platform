import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.username = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
