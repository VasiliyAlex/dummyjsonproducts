import { createHashRouter } from "react-router-dom";
import Product from "../pages/Product";
import  Products  from "../pages/Products";



 const Paths = {
    products: '/',
    product: '/:id',
}

export const router = createHashRouter([
    {
      path: Paths.products,
      element: <Products/>,
    },
    {
      path: Paths.product,
      element: <Product/>,
    }
  ])
  