import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const user = Cookies.get('user');

const initialState = (user && JSON.parse(user)) || {
  email: null,
  token: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
      const currentUser = JSON.stringify(action.payload);
      Cookies.set('user', currentUser);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.username = null;
      Cookies.remove('user');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
