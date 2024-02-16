import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
          state.isFetching = true,
          state.error = false
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false,
            state.user = action.payload
        },
        loginFailure:(state)=>{
           state.isFetching = false,
           state.user =null,
           state.error = true
        },
        logout:()=>{
            state.user=null,
            state.isFetching=false,
            state.error=false
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logout} = UserSlice.actions

export default UserSlice.reducer