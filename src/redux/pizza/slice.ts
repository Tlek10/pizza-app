import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Pizza, PizzaSliceState} from "./types";
import {fetchPizzas} from "./asyncActions";

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading'
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    }
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
