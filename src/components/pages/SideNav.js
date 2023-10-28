import React from "react"
import App from "../App";
import { auth, user, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Login.css"
import { collection, query, where, getDoc, getDocs } from "firebase/firestore/lite"
import logo from "../images/logo.png"
import { useParams } from 'react-router-dom';
import './SideNav.css';


function SideNav() {

  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState(null)
  //const [userData, setUserData] = useState(null)
  const [userData, setUserData] = useState({ email: null, firstname: null, lastname: null, status: null })

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
  //   const handleLogout = () => {
  //     auth.signOut()
  //     navigate("/login")
  // }
  const handleLogout = () => {
    auth.signOut()
    navigate("/login")
  }

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/dashboard" className="brand-link">
          <img src={logo} alt="Logo" className="brand-image img-circle elevation-3"  style={{ opacity: '1' }} />
          <h4 className="brand-text font-weight-light">AquaSense+</h4>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <Link to="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="nav-icon fa fa-home fa-fw" />
                      <p>Home</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/locationlist" className="nav-link">
                      <i className="nav-icon fa fa-table fa-fw" />
                      <p>Reported Disease List</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/diseasescalendar" className="nav-link">
                      <i className="nav-icon far fa-calendar-alt" />
                      <p>Diseases Calendar</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/diseases" className="nav-link">
                      <i className="nav-icon far fa-calendar-altnav-icon far fa-hospital fa-fw" />
                      <p>Diseases</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/weathermap" className="nav-link">
                      <i className="nav-icon fa fa-map-signs" />
                      <p>Map & Weather</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="nav-icon fas fa-columns" />
                      <p onClick={handleLogout}>
                        Logout
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>

  );
}

export default SideNav;