import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, currentPage, categoryId } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://65d1eb44987977636bfbaad2.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`
        );
        return data;
    }
);
