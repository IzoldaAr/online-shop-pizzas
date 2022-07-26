import { SearchContext } from 'App';
import { Categories, SortPopup, PizzaBlock } from 'components';

import { useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootStore, AppDispatch } from 'store';
import { setCategoryId, setSortType, setFilters } from 'store/slice/filterSlice.js';
import { fetchPizzas } from 'store/slice/pizzasSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { list } from '../../components/SortPopup';
import axios from 'axios';
import { stringify } from 'querystring';
//import { debounce } from '../../actions';
export type TPizza = {
  id: number;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[]
  
};

type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

function Home() {
  const dispatch:AppDispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  // const [pizzasItems, setPizzasItems] = useState<TPizza[]>([]);
  const { categoryId, sortType } = useSelector((state: TRootStore) => state.filter);
  const { pizzas } = useSelector((state: TRootStore)=>state.pizzas)
  const navigate = useNavigate();

  // const firstRenderRef = useRef(false);

  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  const getPizzas = async() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({category, sortBy, order, search})) 

  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj: any) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // return () => {
    //   isSearch.current = true;
    // };
  }, [categoryId, sortType.sortProperty, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onCategoryChange={(index: number) => dispatch(setCategoryId(index))}
        />
        <SortPopup
          sortType={sortType}
          //onSortTypeChange={(sort) => debounce(console.log(123), 5000)}
          onSortTypeChange={(sort) => dispatch(setSortType(sort))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza, index) => (
          <PizzaBlock {...pizza} key={`${pizza.title}_${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
