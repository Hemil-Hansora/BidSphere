import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./slices/userSlice.js";

export const store = configureStore({
    reducer : {
        user : useReducer
    }
})