import React, {useEffect, useState} from 'react';
import Sort from "../Components/Sort";
import {Skeleton} from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Categories from "../Components/Categories";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import Pagination from "../Components/Pagination";
import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {selectPizzaData} from "../redux/pizza/selectors";
import {setCategoryId} from "../redux/filter/slice";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {useSelector} from "react-redux";

const Home: React.FC = () => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {categoryId, sort, searchValue} = useSelector(selectFilter);

    const {items, status} = useSelector(selectPizzaData);

    const sortType = sort.sortProperty;

    const [currentPage, setCurrentPage] = useState(1);


    const onClickCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    },[]);


    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

        console.log('Sort by:', sortBy, 'Order:', order, 'Category ID:', categoryId, 'Current Page:', currentPage); // Отладочное сообщение

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                currentPage: String(currentPage),
                categoryId: String(categoryId),
                search: searchValue,
            }),
        );
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        console.log('Fetching pizzas...');
        getPizzas();
    }, [categoryId, sortType, currentPage]);


    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });
        navigate(`?${queryString}`);

        if (!window.location.search) {
           dispatch( fetchPizzas({}));
        }
    }, [categoryId, currentPage, navigate]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (<div className="content__error-info">
                        <h2>
                            Произошла ошибка <span>😕</span>
                        </h2>
                        <p>
                            Не удалось получить пиццы.
                            <br/>
                            Для того, чтобы заказать пиццу, вернитесь через 15 мин.
                        </p>
                    </div>
                ) : <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items
                            .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj: any) =>  <PizzaBlock key={obj.id} {...obj}/>)
                    }
                </div>
            }
            <Pagination onChangePage={(page: number) => setCurrentPage(page)}/>
        </div>
    );
}

export default Home;
