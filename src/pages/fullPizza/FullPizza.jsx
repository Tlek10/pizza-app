import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styles from "./FullPizza.module.scss";

function FullPizza() {
    const [pizza, setPizza] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://65d1eb44987977636bfbaad2.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                navigate('/');
            }
        }
        fetchPizza();
    }, [id]);

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus lectus quis mauris congue, vel tempus justo fermentum.
                    </p>
                    <button className={styles["add-to-cart-button"]}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    );
}

export default FullPizza;
