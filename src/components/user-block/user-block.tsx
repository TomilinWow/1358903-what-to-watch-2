import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { userStatusData } from '../../store/auth/auth-selectors.ts';
import { logout } from '../../store/api-actions.ts';

const UserBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userStatusData);
  const history = useNavigate();
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      history('/login');
    }
  }, [history, user]);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to="/mylist">
          <div className="user-block__avatar">
            <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <button style={{border: 'none', background: 'transparent'}} onClick={logoutUser} className="user-block__link">Sign out</button>
      </li>
    </ul>
  );
};

export default UserBlock;
