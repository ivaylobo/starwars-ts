import loginSlice from "./login-slice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {log: loginSlice.reducer}
});

export type RootState = ReturnType<typeof store.getState>;

export default store;