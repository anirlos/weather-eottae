import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		accessToken: null,
		refreshToken: null,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.accessToken = action.payload.access_token;
			state.refreshToken = action.payload.refresh_token;
		},
		logoutSuccess: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
		},
	},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
