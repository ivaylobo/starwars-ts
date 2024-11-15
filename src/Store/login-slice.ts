import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginStateType} from "../types/LoginStore.ts";


const username = localStorage.getItem('username');

const initialState: LoginStateType = {
    userName: username
}

const loginSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>){
            state.userName = action.payload;
        },
        logout(state){
            state.userName = '';
        },

    }
})

export const loginActions = loginSlice.actions;

export default loginSlice;