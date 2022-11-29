import { useState } from 'react';
import { TPizza } from 'pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slice/cartSlice';
import { TRootStore } from 'store';

function PizzaBlock({ id, imageUrl, title, price, sizes, types: widthTypes }: TPizza) {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: TRootStore) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const pazzasWidth = ['тонкое', 'традиционное'];

  const countInCart = cartItem ? cartItem.count : null;

  const onAddClick = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: pazzasWidth[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  const selectActiveSize = (index: number) => {
    setActiveSize(index);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {widthTypes.map((widthType, index) => (
            <li
              key={widthType}
              onClick={() => {
                setActiveType(index);
              }}
              className={activeType === index ? 'active' : ''}
            >
              {pazzasWidth[widthType]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={index === activeSize ? 'active' : ''}
              onClick={() => {
                selectActiveSize(index);
              }}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add" onClick={onAddClick}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countInCart && <i>{countInCart}</i>}
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
