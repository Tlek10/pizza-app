import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss'
// @ts-ignore
import debounce from 'lodash.debounce';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

function Search() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 1000),
        [],
    )

    const onChangeInput = (event: any) => {
        const searchValue = event.target.value;
        setValue(searchValue);
        updateSearchValue(searchValue);
    };


    return (
        <div>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.root}
                placeholder="Поиск пиццы"
            />
            {
                value && (
                    <svg onClick={onClickClear} className={styles.clearIcon}
                         xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48">
                        <path
                            d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
                        <path d="M0 0h48v48H0z" fill="none"/>
                    </svg>
                )
            }
        </div>

    );
}

export default Search;
