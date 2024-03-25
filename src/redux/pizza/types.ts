export type Pizza = {
    id: string, title: string, price: number, imageUrl: string, sizes: number[], types: number[]
}
export interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
}