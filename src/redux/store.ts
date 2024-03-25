import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cartSlice from './cart/slice'
import pizza from './pizza/slice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cartSlice,
        pizza
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () =>useDispatch<AppDispatch>()

