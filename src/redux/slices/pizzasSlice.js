// pizzaSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const {sortBy, order, currentPage, categoryId} = params;
        console.log('Fetch Pizzas params:', params); // Отладочное сообщение
        const {data} = await axios.get(`https://65d1eb44987977636bfbaad2.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}`);
        return data;
    }
);


const initialState = {
    items: [],
    status: 'loading'
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
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

export const selectPizzaData = (state) => state.pizza;

export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;
