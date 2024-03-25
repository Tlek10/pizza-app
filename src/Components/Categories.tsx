import React from 'react';
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
    value: number;
    onClickCategory: (idx:number) =>void;
}
const Categories: React.FC<CategoriesProps> = React.memo( ({value, onClickCategory}) => {
    useWhyDidYouUpdate('Categories',{value, onClickCategory} )
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, i) => (
                        <li
                            key={i}
                            onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
                            {categoryName}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
})

export default Categories;
