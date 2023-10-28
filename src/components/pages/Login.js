import React, { useState } from 'react';
import { auth, user, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from '../images/logo.png';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  // const [firstName, setFirstname] = useState(null);
  // const [lastName, setLastname] = useState(null);
  const [name, setFirstname] = useState(null);
  const [mobileNo, setMobileno] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [notification, setNotification] = useState(null);
  const db = getFirestore();

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password === rePassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: user.email,
            name,
            mobileNo,
          };

          // Store additional user data in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, userData);

          showNotification('Successfully Signed Up!!', true);
          setSignupSuccess(true);
        })
        .catch((error) => {
          showNotification('Signup Failed', false);
          console.error('Error signing up:', error);
        });
    } else {
      showNotification('Password do not match', false);
    }
  };

  const handleLoginSubmit = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        showNotification('Login Failed', false);
        console.error('Error signing in:', error);
      });
  };

  const handleInput = (type, event) => {
    if (type === 'password') {
      setPassword(event.target.value);
    } else if (type === 'email') {
      setEmail(event.target.value);
    } else if (type === 'name') {
      setFirstname(event.target.value);
    } else if (type === 'mobileNo') {
      setMobileno(event.target.value);
    } else if (type === 'rePassword') {
      setRePassword(event.target.value);
    }
  };

  const handleLoginInput = (type, event) => {
    if (type === 'password') {
      setLoginPassword(event.target.value);
    } else if (type === 'email') {
      setLoginEmail(event.target.value);
    }
  };

  const toggleSignup = () => {
    if (signupSuccess) {
      setSignupSuccess(false);
    } else {
      setSignupSuccess(true);
    }
  };

  const showNotification = (message, success = true) => {
    setNotification({ message, success });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Clear the notification after 3 seconds
  };

  return (
    <>
      <div className=" wrapper bg-white d-flex align-items-center justify-content-center w-100">
        <div className="background"></div>
        <div className="login">
          <h1 className="mb-3"></h1>
          <form className="needs-validation">
            <div>
              <div className="imgs">
                <div className="container-image">
                  <img src={logo} alt="" className="pro" />
                </div>
              </div>
            </div>
            {!signupSuccess ? (
              <>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    onChange={(event) => handleLoginInput('email', event)}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={(event) => handleLoginInput('password', event)}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <br />
                <button onClick={handleLoginSubmit} type="button" className="button">
                  Login
                </button>
              </>
            ) : (
              <>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    onChange={(event) => handleInput('name', event)}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                  <div className="invalid-feedback">Please Enter your First Name</div>
                </div>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="mobileNo" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    onChange={(event) => handleInput('mobileNo', event)}
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                  />
                  <div className="invalid-feedback">Please Enter your Last Name</div>
                </div>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={(event) => handleInput('email', event)}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <div className="invalid-feedback">Please Enter your Email</div>
                </div>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={(event) => handleInput('password', event)}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <div className="invalid-feedback">Please Enter your Password</div>
                </div>
                <div className="form-group was-validated mb-2">
                  <label htmlFor="rePassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    onChange={(event) => handleInput('rePassword', event)}
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                  <div className="invalid-feedback">Please Enter Password Again to Confirm</div>
                </div>
                <button onClick={handleSubmit} type="button" className="button1">
                  SignUp
                </button>
                <br />
              </>
            )}
            <button onClick={toggleSignup} type="button" className="btn btn-success w-100 mt-1">
              {signupSuccess ? 'Go to login' : 'Go to signup'}
            </button>
          </form>
        </div>
        {notification && (
          <div className={`notification ${notification.success ? 'success' : 'error'}`}>
            {notification.message}
          </div>
        )}
      </div>
      <h10>Aquasense+ 2023</h10>
    </>
  );
}
