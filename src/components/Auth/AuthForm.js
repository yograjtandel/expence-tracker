import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let url
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo';
    }else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo'; 
    }
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          'email':email,
          'password': password,
          'returnSecureToken': true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((data) => {
      debugger 
    })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
