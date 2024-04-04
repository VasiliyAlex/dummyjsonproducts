import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IProduct } from '../types/types'

interface IProductsStore {
    data: IProduct[] | null;
    products: IProduct[] | null;
    setProducts: (productsData: IProduct[]) => void;
}

const productsStore = create<IProductsStore>()(devtools(
    (set,get) => ({
        data : null,
        products: null,
        setProducts: (productsData) => set({products: productsData}),
    }) 
))

export default productsStore