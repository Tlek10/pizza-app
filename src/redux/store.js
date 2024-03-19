import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizza from './slices/pizzasSlice'

export const store = configureStore({
    reducer: {
        filter,
        cartSlice,
        pizza
    },
});

console.log(store)