import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const user = Cookies.get('user');

const initialState = (user && JSON.parse(user)) || {
  user: {
    email: null,
    token: null,
    username: null,
    image: '/Default_user.png',
  },
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLogged = true;

      const currentUser = JSON.stringify({
        user: state.user,
        isLogged: state.isLogged,
      });
      Cookies.set('user', currentUser);
    },
    removeUser(state) {
      state.user = {
        email: null,
        token: null,
        username: null,
        avatar: null,
      };
      state.isLogged = false;
      Cookies.remove('user');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
