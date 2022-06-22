import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

//login functionality 
export const login = createAsyncThunk(
  "auth/login",
   //passing it as a props from from login.js
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//register functionality
export const register = createAsyncThunk(
  "auth/register",
  //passing it as a props from from register.js
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//google registration functionality
export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  //passing it as a props from login.js
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Google Sign-in Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//created a createSlice functionality
const authSlice = createSlice({
  name: "auth",
  //setting the initialState
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
 
  reducers: {
     //reducer preventing to remove user while refreashing the brower
    setUser: (state, action) => {
      state.user = action.payload;
    },
     //reducer for clearing the user from the localStorage
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    //for login
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //for registeration
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //for google signIn
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

//exporting the reducer to header
export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
