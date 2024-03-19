import React, {useEffect, useState} from 'react';
import Sort from "../Components/Sort";
import {Skeleton} from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Categories from "../Components/Categories";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId} from "../redux/slices/filterSlice";
import Pagination from "../Components/Pagination";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {categoryId, sort, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);

    const sortType = sort.sortProperty;

    const [currentPage, setCurrentPage] = useState(1);


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };


    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

        console.log('Sort by:', sortBy, 'Order:', order, 'Category ID:', categoryId, 'Current Page:', currentPage); // Отладочное сообщение

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
            fetchPizzas();
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
                            .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj}/></Link>)
                    }
                </div>

            }
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
}

export default Home;
