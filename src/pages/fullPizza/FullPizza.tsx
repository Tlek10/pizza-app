import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FullPizza.module.scss';
import {selectPizzaData} from "../../redux/pizza/selectors";

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pizzaData = useSelector(selectPizzaData);
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    } | null>(null);

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://65d1eb44987977636bfbaad2.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                navigate('/');
            }
        }

        if (!pizzaData.items.length) {
            fetchPizza();
        } else {
            const selectedPizza = pizzaData.items.find(item => item.id === id);
            setPizza(selectedPizza || null);
        }
    }, [id, navigate, pizzaData]);

    if (!pizza) {
        return <div className={styles.container}>LOADING...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles["pizza-details"]}>
                <img src={pizza.imageUrl} alt={pizza.title} className={styles["pizza-image"]} />
                <div className={styles["pizza-info"]}>
                    <h2 className={styles["pizza-title"]}>{pizza.title}</h2>
                    <p className={styles["pizza-price"]}>${pizza.price}</p>
                    <p className={styles["pizza-description"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus lectus quis mauris
                        congue, vel tempus justo fermentum.
                    </p>
                    <button  className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 19 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        </svg>
                        <span>Добавить</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FullPizza;
