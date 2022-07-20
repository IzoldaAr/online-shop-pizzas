import classNames from 'classnames';
import { SetStateAction, useState } from 'react';

function Categories({ items }: any) {
  const [activeItem, setActiveItem] = useState(null);

  const selectActiveItem = (index: SetStateAction<null>) => {
    setActiveItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li className={activeItem === null ? 'active' : ''} onClick={() => selectActiveItem(null)}>
          Все
        </li>
        {items.map((item: any, index: any) => (
          <li
            key={`${item}_${index}`}
            className={activeItem === index ? 'active' : ''}
            onClick={() => selectActiveItem(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
