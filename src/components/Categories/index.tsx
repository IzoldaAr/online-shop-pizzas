import { SetStateAction, useState } from 'react';

function Categories({ categoryId, onCategoryChange }: any) {
  // const selectActiveItem = (index: SetStateAction<null>) => {
  //   setActiveItem(index);
  // };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item: any, index: any) => (
          <li
            key={`${item}_${index}`}
            className={categoryId === index ? 'active' : ''}
            onClick={() => onCategoryChange(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
