import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () => {
 const newPasswordInputRef = useRef();
 const authCtx = useContext(AuthContext);
 const history = useHistory;

 const submitHandler = event =>{
  event.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;

  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCmVNApFRGhZUEdeW5nAImteSXqdRKPi3U',{
    method: 'POST',
    body: JSON.stringify({
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: false
    }),
    headers: {
      'Content-Type': 'application/json'
      }
  }).then(res => {
    history.replace('/');
  });
 }
 
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
