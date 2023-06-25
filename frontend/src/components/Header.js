import React from "react";
import { Route, Link, Routes } from 'react-router-dom';
import headerLogo from '../images/Vector.png';

function Header({ userEmail, signOut, openPopupBurger }) {

  const [isActiveBurgerMenu, setActiveBurgerMenu] = React.useState(false);

  function openPopupBurger() {
    setActiveBurgerMenu(!isActiveBurgerMenu)
  }
  return (
    <header className={isActiveBurgerMenu ? "header header_type_active" : "header"}>
      <img className="header__logo" src={headerLogo} alt="Место" />
      <Routes>
        <Route path="/sign-up" element={
          <Link to={"/sign-in"} className="header__link">Войти</Link>} />
        <Route path="/sign-in" element={
          <Link to={"/sign-up"} className="header__link">Регистрация</Link>} />
        <Route path="/" element={
          <>
            <div className={isActiveBurgerMenu ? "header__panel header__panel_active" : "header__panel"}>
              <p className='header__email'>{userEmail}</p>
              <button onClick={signOut} className="header__logout">Выйти</button>
            </div>
            <button className={isActiveBurgerMenu ? "header__burger header__burger_active" : "header__burger"} onClick={openPopupBurger}>
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
            </button>
          </>
        } />
      </Routes>
    </header>
  );
}

export default Header;
