import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootStore } from 'store';
import { addUserInfo, resetUserInfo } from 'store/slice/authSlice';
import { Link } from 'react-router-dom';
import { clearItems } from 'store/slice/cartSlice';
import { CartItem } from '../../components';

function Cart() {
  const dispatch = useDispatch();
  //const authStore = useSelector<TRootStore>((store) => store.auth);
  const pizzaItems = useSelector((state: TRootStore) => state.cart.items);
  const { totalPrice, totalCount } = useSelector((state: TRootStore) => state.cart);
  //console.log(authStore);
  const onClickClear = () => {
    if (window.confirm('Do you want to clear the cart?')) {
      dispatch(clearItems());
    }
  };

  useEffect(() => {
    dispatch(
      addUserInfo({
        email: 'example@user.com',
        username: 'JJJJ',
      })
    );
  }, []);

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">Корзина</h2>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33337 9.16667V14.1667"
              stroke="#B6B6B6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span onClick={onClickClear} style={{ cursor: 'pointer' }}>
            Очистить корзину
          </span>
        </div>
      </div>
      <div className="content__items">
        {pizzaItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{totalCount} шт.</b>{' '}
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>{' '}
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link className="button button--outline button--add go-back-btn" to="/">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
