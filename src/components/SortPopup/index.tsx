import { useEffect, useState, useRef, FC, RefObject } from 'react';

type TProp = {
  items: string[];
};

function SortPopup({ items }: TProp) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const sortRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    document.body.addEventListener('click', closeSortPopup);
  }, []);

  const selectSortItem = (index: any) => {
    setActiveItem(index);
  };

  const togglePoppup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closeSortPopup = (e: any) => {
    if (!e.path.includes(sortRef.current)) {
      setIsPopupVisible(false);
    }
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className={!isPopupVisible ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span ref={sortRef} onClick={togglePoppup}>
          {items[activeItem]}
        </span>
      </div>
      {isPopupVisible && (
        <div className="sort__popup">
          <ul>
            {items.map((item: any, index: any) => (
              <li
                key={`${item}_${index}`}
                className={activeItem === index ? 'active' : ''}
                onClick={() => selectSortItem(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortPopup;
