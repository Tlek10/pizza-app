// EmptyCartBlock.js
import React from 'react';
import styles from './EmptyCartBlock.modules.scss';

const EmptyCartBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>👽</span>
                <br/>
                Ничего не найденоооо!!!
            </h1>
            <p> asdassdas dsa dad ad sad adsadsadsad sadsa dsa</p>
        </div>
    );
};

export default EmptyCartBlock;
