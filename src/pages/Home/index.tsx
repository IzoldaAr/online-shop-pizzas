import { SearchContext } from 'App';
import { Categories, SortPopup, PizzaBlock } from 'components';

import { useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootStore } from 'store';
import { setCategoryId, setSortType } from 'store/slice/filterSlice.js';
//import { debounce } from '../../actions';

export type TPizza = {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

function Home() {
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);
  const [pizzasItems, setPizzasItems] = useState<TPizza[]>([]);
  const { categoryId, sortType } = useSelector((state: TRootStore) => state.filter);
  // const firstRenderRef = useRef(false);

  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      'https://630492e494b8c58fd720179b.mockapi.io/items?' + category + sortBy + order + search
    ).then((res) =>
      res.json().then((arr) => {
        setPizzasItems(arr);
      })
    );
    // firstRenderRef.current = true;
  }, [categoryId, sortType, searchValue]);
  console.log({ searchValue });

  // useEffect(() => {
  //   if (firstRenderRef.current) {
  //     //...
  //   }
  // }, [searchValue]);

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
        {pizzasItems.map((pizza, index) => (
          <PizzaBlock {...pizza} key={`${pizza.title}_${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
