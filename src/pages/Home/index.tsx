import { Categories, SortPopup, PizzaBlock } from 'components';

import { useEffect, useState } from 'react';

export type TPizza = {
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

function Home() {
  const [pizzasItems, setPizzasItems] = useState<TPizza[]>([]);
  console.log(pizzasItems, 'pizzasItems');

  useEffect(() => {
    fetch('https://626d16545267c14d5677d9c2.mockapi.io/items').then((res) =>
      res.json().then((arr) => {
        setPizzasItems(arr);
      })
    );
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
        <SortPopup items={['популярности', 'цене', 'алфавиту']} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzasItems.map((pizza, index) => (
          <PizzaBlock {...pizza} key={`${pizza.name}_${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
