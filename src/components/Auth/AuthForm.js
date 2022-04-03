import { useState, useRef, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/AuthContext";
import { ExpencesAction } from "../../store/expences-slice";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (uid) {
      dispatch(ExpencesAction.addUserId(uid));
    }
  }, [dispatch]);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    debugger
    if (email && password) {
      let url = "";
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("auth fail");
          }
        })
        .then(async (user) => {
          const res = await fetch(
            `https://expencetracker-b3897-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email}"&print=pretty`
          );

          res.json().then(async (data) => {
            let userId = "";

            const add_email = async () => {
              const userRes = await fetch(
                "https://expencetracker-b3897-default-rtdb.firebaseio.com/users.json",
                {
                  method: "post",
                  body: JSON.stringify({
                    email: localStorage.getItem("email"),
                  }),
                  headers: {
                    "Content-Type": "Application/Json",
                  },
                }
              );
              if (userRes.ok) {
                return userRes.json().then((user) => {
                  return user["name"];
                });
              } else {
                throw new Error("not able to add email");
              }
            };

            if (Object.keys(data).length === 0) {
              try {
                userId = await add_email();
              } catch (error) {
                alert(error);
              }
            } else {
              userId = Object.keys(data)[0];
            }
            dispatch(ExpencesAction.addUserId(userId));
            ctx.onLogin(email, user.idToken);
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
