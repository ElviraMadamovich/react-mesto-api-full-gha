import React, { useState } from 'react';
import loadingPic from "../images/loading.gif";

function Authorization({ name, buttonName, onSubmit, isValid, children }) {

  const [loadingImage, setLoadingImage] = useState(false);


  function handleAuthorization(e) {
    onSubmit(e, setLoadingImage);
    setLoadingImage(true)
  }

  return (
    <form className="authorization__form" name={name} noValidate onSubmit={handleAuthorization}>
      {children}
      {loadingImage ?
        <img className='authorization__pic' src={loadingPic} alt='анимация загрузки' />
        :
        <input
          disabled={isValid}
          className={isValid ? "authorization__button authorization__button_inactive" : "authorization__button"}
          type="submit"
          value={buttonName} />
      }
    </form>
  );
}

export default Authorization;