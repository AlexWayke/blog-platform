import './header.scss';

function Header() {
  return (
    <header className="header">
      <h6 className="header__title">Realworld Blog</h6>
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
