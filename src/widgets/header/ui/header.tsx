import { Link } from 'react-router';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      <a href="/" className="header__button">
        Sign In
      </a>
      <a href="/" className="header__button header__button--green">
        Sign Up
      </a>
    </header>
  );
}

export default Header;
