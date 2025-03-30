import { server } from "@/const";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderBoard: [],
    error: null,
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFaild(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    clearAllErrors(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.leaderBoard = state.leaderBoard;
      state.loading = false;
    },
  },
});

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.logoutFaild());
    toast.error(error.response.data.message);
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${server}/users/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${server}/users/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export default userSlice.reducer;
