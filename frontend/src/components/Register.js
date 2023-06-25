import { Link } from 'react-router-dom';
import Authorization from "./Authorization";
import { useValidation } from "../hooks/useValidation";

function Register({ onRegister }) {
  const { values, resetForm, handleUpdate, errors, isValid } = useValidation();

  function submitAuthorization(e, setLoadingImage) {
    e.preventDefault();
    onRegister(values, resetForm, setLoadingImage)
  }

  return (
    <main className="main">

      <section className="authorization">
        <h1 className="authorization__title">Регистрация</h1>
        <Authorization isValid={!isValid} name={'register'} onSubmit={submitAuthorization} buttonText="Зарегистрироваться">
          <fieldset className="authorization__data">
            <input
              id="emailInput"
              className={errors.emailInput ? "authorization__input authorization__input_type_error" : "authorization__input"}
              type="email"
              name="emailInput"
              required
              minLength="2"
              maxLength="40"
              placeholder="Email"
              value={values.emailInput || ''}
              onChange={handleUpdate}
              autoComplete="new-email" />

            <span
              id="emailInput-error"
              className="authorization__error">{errors.emailInput}</span>

            <input
              id="password-input"
              className={errors.password ? "authorization__input authorization__input_type_error" : "authorization__input"}
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              value={values.password || ''}
              onChange={handleUpdate}
              autoComplete="new-password" />

            <span id="name-password-error"
              className="authorization__error">{errors.password}</span>

          </fieldset>
        </Authorization>
        <Link to="/sign-in" className="authorization__question">
          Уже зарегистрированы? Войти
        </Link>

      </section>

    </main>
  );
}

export default Register;