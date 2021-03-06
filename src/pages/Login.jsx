import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function Login({ history }) {
  const { email, setEmail } = useContext(ReceitasContext);
  const [enable, setEnable] = useState(false);
  const [pass, setPass] = useState('');

  function handleClick() {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
    setEnable(false);
  }

  useEffect(() => {
    const seven = /.{7,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setEnable(reg.test(email) && seven.test(pass));
  }, [email, pass]);

  return (
    <section className="login-container">
      <h2 className="login-title">APP DE RECEITAS</h2>
      <section className="login-input-btn">
        <div className="login-image" />
        <section className="login-inputs">
          <input
            className="login-email"
            data-testid="email-input"
            type="email"
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            className="login-pass"
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ ({ target }) => setPass(target.value) }
          />
          <section className="login-button-container">
            <button
              onClick={ () => { handleClick(); } }
              data-testid="login-submit-btn"
              type="button"
              className="login-button"
              disabled={ !enable }
            >
              Entrar
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}

Login.defaultProps = {
  history: '/',
};

Login.propTypes = {
  history: propTypes.shape(),
};

export default Login;
