import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Sort from "../Components/Sort";
import { Skeleton } from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Categories from "../Components/Categories";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import Pagination from "../Components/Pagination";
import {fetchPizzas} from "../redux/slices/pizzasSlice";
import search from "../Components/Search";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {categoryId, sort} = useSelector(state => state.filter);


    const {items, status} = useSelector(state => state.pizza);

    const sortType = sort.sortProperty;
    const {searchValue} = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(1);


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };


    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                currentPage,
                categoryId,
                search: searchValue,
            }),
        );
        window.scrollTo(0, 0);
    };


    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });
        navigate(`?${queryString}`);

        if(!window.location.search){
            fetchPizzas();
        }
    }, [categoryId, sortType, currentPage, navigate]);

    useEffect(() => {
        getPizzas();
    }, [categoryId, sortType, currentPage]);




    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'? (<div className="content__error-info">
                    <h2>
                        Произошла ошибка <span>😕</span>
                    </h2>
                    <p>
                        Не удалось получить пиццы.
                        <br />
                        Для того, чтобы заказать пиццу, вернитесь через 15 мин.
                    </p>
                </div>
                ): <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items
                            .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
                    }
                </div>

            }
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
}

export default Home;
