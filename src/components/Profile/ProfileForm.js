import { useRef, useContext } from 'react';

import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';


const ProfileForm = () => {
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);

  const onSubmithandler = (ev) => {
    ev.preventDefault()
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: ctx.idToken,
        password: passwordRef.current.value,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': "application/json"
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        throw new Error("there is some issue while re-set password")
      }
    }).then(data => {
      passwordRef.current.value = "";
      ctx.onResetPassword(data.idToken)
      alert("successfully changed your password");
    }).catch((error) => {
      alert(error)
    }) 
  };

  return (
    <form className={classes.form} onSubmit={onSubmithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
