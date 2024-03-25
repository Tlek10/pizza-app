export type Sort = {
    name: string,
    sortProperty: 'rating' | 'price' | 'title',
};
export interface FilterSliceState{
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort:Sort
}

export const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
}