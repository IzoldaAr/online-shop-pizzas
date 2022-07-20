import NotFoundBlock from 'components/NotFoundBlock';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootStore } from 'store';
import { addUserInfo, resetUserInfo } from 'store/slice/authSlice';

function NotFound() {
  return <NotFoundBlock />;
}

export default NotFound;
