import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken: null,
        refreshToken: null,
    },
    reducers:{
        loginSucsess:(state,action)=>{
            state.accessToken=action.payload.access_token;
            state.refreshToken=action.payload.refresh_token; 
        },
        logoutSucess:(state)=>{
            state.accessToken=null;
            state.refreshToken=null;
        },
          
        },
    })

export const {loginSucsess, logoutSucess} = authSlice.actions;
export default authSlice.reducer; 

