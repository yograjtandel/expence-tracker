import { Link } from "react-router-dom";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/AuthContext";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    ctx.onLogout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!!ctx.idToken && <Link to="/">Home</Link>}</li>
          <li>{!!!ctx.idToken && <Link to="/auth">Login/SignUp</Link>}</li>
          <li>{!!ctx.idToken && <Link to="/profile">Profile</Link>}</li>
          <li>
            {!!ctx.idToken && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
