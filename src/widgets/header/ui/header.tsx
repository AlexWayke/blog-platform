import { Link, useNavigate } from 'react-router';
import './header.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { removeUser } from '@/entities/slices/userSlice';
import { useState } from 'react';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogged, user } = useAppSelector((state) => state.user);
  const { image, username } = user;
  const [avatar, setAvatar] = useState(image);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/');
  };
  const handleErrorImg = () => {
    setAvatar('/Default_user.png');
  };

  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      {!isLogged && (
        <div className="header__controls">
          <Link to="/sign-in" className="header__button">
            Sign In
          </Link>
          <Link to="/sign-up" className="header__button header__button--sign-up">
            Sign Up
          </Link>
        </div>
      )}
      {isLogged && (
        <div className="header__controls">
          <Link to="/new-article" className="header__button header__button--create-article">
            Create article
          </Link>
          <Link to="/edit-profile" className="header__user">
            <p className="header__user-name">{username}</p>
            <img className="header__user-img" onError={handleErrorImg} src={avatar} alt="User avatar" />
          </Link>
          <button onClick={() => handleLogout()} className="header__button header__button--logout">
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
