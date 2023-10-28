import React from "react";
import App from "../App";
import { auth, user, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Login.css"
import { collection, query, where, getDoc, getDocs } from "firebase/firestore/lite"
import logo from "../images/logo.png"

function Header1() {

  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState(null)
  //const [userData, setUserData] = useState(null)
  const [userData, setUserData] = useState({ email: null, firstName: null, lastName: null, status: null })

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (userEmail === null) {
          const userDataRef = collection(db, "users")
          const q = query(userDataRef, where("email", "==", user.email))
          const querySnapshot = await getDocs(q)
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data())
              setUserEmail(user.email)
            })
          } else {
            alert("Authentication Error: User data not found.")
            navigate("/login")
          }

        }

      } else {
        setUserEmail(null)
        navigate("/login")
      }
    })
  })

  const handleLogout = () => {
    auth.signOut()
    navigate("/login")
  }
  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" Link to="#" role="button"><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/dashboard" className="nav-link"><h4>Dashboard</h4></Link>
            <div className="dashboard-content">
              {userEmail && <h4>Welcome, {userData.name}</h4>}
            </div>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" className="nav-link"></Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">

                  <div className="input-group-append">
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" Link to="#" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" Link to="#" role="button">
              <i className="fas fa-th-large" />
            </a>
          </li>
          < img className="headerimg" src={logo} alt="Logo" />
          <div className="dashboard-content-status">
            <h2></h2>
            <h4>{userData.status === "admin" && "Admin"}</h4>
            <h4>{userData.status === "client" && "Client"}</h4>
            {userEmail && <button color="red" className="buttonlogout" onClick={handleLogout}>Logout</button>}
          </div>
        </ul>
      </nav>
      {/* /.navbar */}

    </div>
  );
}

export default Header1;