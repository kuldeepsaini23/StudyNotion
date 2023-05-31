import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  laoding:false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
  name:"auth",
  initialState: initialState,
  reducers:{
    setSignup(state, value){
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value){
      state.token = value.payload;
    },
  },
});

export const {setSignupData,setLoading,setToken} = authSlice.actions;
export default authSlice.reducer; 
