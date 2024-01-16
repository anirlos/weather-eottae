import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken: null,
        refreshToken: null,
    },
    reducers:{
        loginSuccsess:(state,action)=>{
            state.accessToken=action.payload.access_token;
            state.refreshToken=action.payload.refresh_token; 
        },
        logoutSuccess:(state)=>{
            state.accessToken=null;
            state.refreshToken=null;
        },
          
        },
    })

export const {loginSuccsess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer; 

