
import { auth, user, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, query, where, getDoc, getDocs } from "firebase/firestore/lite"
import Header1 from "./Header1"
import Footer from "./Footer"
import SideNav from "./SideNav"
import Home from "./Home"

export default function Dashboard() {

    return(
        <>
        <div className = "dashboard-wrapper">
        <Header1 />
        <SideNav />
        <Home />
        </div>
        </>
    )
}