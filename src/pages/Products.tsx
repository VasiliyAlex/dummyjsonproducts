import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Products.module.scss";
import { getProductsQuery } from "../services/ProductsServices";
import productsStore from "../store/productsStore";
import ProductsItem from "../components/ProductsItem/ProductsItem";
import Search from "../components/Search/Search";
import { IProduct } from "../types/types";

const Products: FC = () => {
  const { isSuccess, isLoading, error } = getProductsQuery();
  const { products } = productsStore();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const totalPages = Math.ceil((products && products.length || 0) / itemsPerPage);
  const currentItems: IProduct[] = products?.slice(indexOfFirstItem, indexOfLastItem) || [];
    

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    isLoading ? <div className={s.loading}>Loading...</div> :
    error ? <div className={s.error}><span className={s.error_text}>Error: {error.message}</span></div> :
    
    <div className={s.products}>
      <Search />
      <div className={s.products_box}>
        {isSuccess &&
          currentItems.map((product) => (
            <Link to={`/${product.id}`} key={product.id}>
              <ProductsItem product={product} />
            </Link>
          ))}
      </div>
      <div className={s.products_pagination}>
      <button
        type="button"
        onClick={handleClickPrev}
        disabled={currentPage === 1}
        className={s.products_pagination_btn}
      >
        Pref
      </button>
        {[...Array(totalPages)].map((_, index) => (
          <button className={s.products_pagination_number}
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
          <button
        type="button"
        onClick={handleClickNext}
        disabled={currentItems.length < itemsPerPage}
        className={s.products_pagination_btn}
      >
        Next
      </button>
      </div>
    </div>
  );
};

export default Products;
