import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootStore } from 'store';
import { addUserInfo, resetUserInfo } from 'store/slice/authSlice';

function Cart() {
  const dispatch = useDispatch();
  const authStore = useSelector<TRootStore>((store) => store.auth);

  useEffect(() => {
    dispatch(
      addUserInfo({
        email: 'example@user.com',
        username: 'JJJJ',
      })
    );
  }, []);

  console.log(authStore);

  return <div>Korzina</div>;
}

export default Cart;
