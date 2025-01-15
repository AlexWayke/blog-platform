import { Link } from 'react-router';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      <Link to="/sign-in" className="header__button">
        Sign In
      </Link>
      <Link to="/sign-up" className="header__button header__button--green">
        Sign Up
      </Link>
    </header>
  );
}

export default Header;
