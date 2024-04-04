import { FC, FormEvent, useEffect, useState } from "react";
import { IProduct } from "../../types/types";
import productsStore from "../../store/productsStore";
import s from "./Search.module.scss";
import { getProductsQuery } from "../../services/ProductsServices";
import Select, { ActionMeta, SingleValueProps } from "react-select";
import closeIcon from "../../assets/close.svg";

type ISortOption = {
  value: keyof IProduct;
  label: string;
};



const sortOptions: ISortOption[] = [
  { value: "title", label: "Title" },
  { value: "price", label: "Price" },
  { value: "stock", label: "Stock" },
];



const Search: FC = () => {
  const { data } = getProductsQuery();
  const setProducts = productsStore((state) => state.setProducts);
  const [search, setSearch] = useState("");
  const [selectedSortOption, setSelectedSortOption] =
    useState<ISortOption | null>(null);

  const sortByKey = (arr: IProduct[], key: keyof IProduct) => {
    return arr?.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  };

  let sortedProducts = data?.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSortBy = (sortOptions: ISortOption | null) => {
    if (sortedProducts && sortOptions) {
      setSelectedSortOption(sortOptions);
      setProducts(sortByKey(sortedProducts, sortOptions.value));
    }
  };
  
  // const handleSortBy = (newValue: SingleValueProps<ISortOption | null>, actionMeta: ActionMeta<ISortOption>) => {
  //   if (sortedProducts) {
  //     setSelectedSortOption(newValue);
  //     setProducts(sortByKey(sortedProducts, newValue));
  //   }
  // };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sortedProducts) {
        setProducts(sortedProducts);
      }
  };
  
  // const closeSearch = () => {
  //   setSearch("")
  //   setProducts(sortedProducts);
  // };
  
  const closeSearch = () => {
    setSearch("");
    let searchAll = ""
    let filteredProducts = data?.filter((data) => data.title.toLowerCase().includes(searchAll.toLowerCase()));
    if (filteredProducts) {
        setProducts(filteredProducts);
      }
  };
  
  
  useEffect(() => {
     if (sortedProducts) {
        setProducts(sortedProducts);
      }},[])
  

  return (
    <div>
      <div className={s.categories}>
        <form className={s.search} onSubmit={(event) => submitForm(event)}>
          <h2 className={s.title}>Search</h2>
          <div className={s.search_box}>
            <input
              type="text"
              className={s.search_box_input}
              placeholder="Поиск"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <img
                onClick={() => closeSearch()}
                src={closeIcon}
                alt=""
                className={s.search_box_close}
              />
            )}
          </div>
          <button className={s.search_btn}>Поиск</button>
        </form>
        <div className={s.select}>
          <h2 className={s.title}>Sort</h2>
          <Select
            options={sortOptions}
            onChange={handleSortBy}
            value={selectedSortOption}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
