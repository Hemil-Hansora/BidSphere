import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./slices/userSlice.js";
import commissionReducer from './slices/commissionSlice.js'

export const store = configureStore({
    reducer : {
        user : useReducer,
        commission : commissionReducer
    }
})