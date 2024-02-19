import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'user',
    initialState:{
        currentuser:null,
        error:false,
    },
    reducers:{
        login:(state,action)=>{
            state.currentuser = action.payload
        },
        loginFailure:(state)=>{
           state.currentuser =null,
           state.error = true
        },
        logout:(state)=>{
            state.currentuser=null,
            state.error=false
        }
    }
})

export const {login,loginFailure,logout} = UserSlice.actions

export default UserSlice.reducer