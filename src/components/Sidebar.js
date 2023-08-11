import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useRef, useState } from "react";
import logo from "../images/logo1.png";

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const sidebarRef = useRef();
    const [state,setState] = useState(false);
    const topRef = useRef();
    const midRef = useRef();
    const lowRef = useRef();

    const handleLogout = () => {
        auth.signOut();
        alert("You have successfully logged out!");
        handleToggle(true);
    }

    const handleToggle = (state) => {
        if(state===true){
            setState(false);
            sidebarRef.current.style.width="0";
            sidebarRef.current.style.visibility="hidden";
            handleOpen();
        }
        else if(state===false){
            setState(true);
            sidebarRef.current.style.width="100%";
            sidebarRef.current.style.visibility="visible";
            handleClose();
        }
    }

    const handleClose = () => {
        topRef.current.style.transform = "translate(0,7px) rotate(-45deg)";
        midRef.current.style.opacity = "0";
        lowRef.current.style.transform = "translate(0,-7px) rotate(45deg)"
    }

    const handleOpen = () => {
        topRef.current.style.transform = "translate(0) rotate(0)";
        midRef.current.style.opacity = "1";
        lowRef.current.style.transform = "translate(0) rotate(0)";
    }

    const handleButton = () => {
        handleToggle(true);
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        })
    }   

    return(
        <div className="Sidebar">
            <div className="Sidebar-lg">
                <img src={logo} alt="Logo" className="Sidebar-logo"></img>
                <div className="Sidebar-link-cont">
                    <Link to="/PollingApp" className="Sidebar-links">Home</Link>
                    {user? <Link to="/PollingApp/Dashboard" className="Sidebar-links">Dashboard</Link>:""}
                    {user? <Link to="/PollingApp" className="Sidebar-links" onClick={handleLogout}>Logout</Link>:<Link to="/PollingApp/Login" className="Sidebar-links">Login</Link>}
                </div>
            </div>
            <div className="Sidebar-sm">
                <div className="Sidebar-bttn">
                    <button className="toggle button" onClick={() => handleToggle(state)}>
                        <div className="top line" ref={topRef}></div>
                        <div className="mid line" ref={midRef}></div>
                        <div className="low line" ref={lowRef}></div>
                    </button>
                </div>
                <div className="Sidebar-container" ref={sidebarRef}>
                    <img src={logo} alt="Logo" className="Sidebar-logo"></img>
                    <div className="Sidebar-link-cont">
                        <Link to="/PollingApp" className="Sidebar-links" onClick={handleButton}>Home</Link>
                        {user? <Link to="/PollingApp/Dashboard" className="Sidebar-links" onClick={handleButton}>Dashboard</Link>:""}
                        {user? <Link to="/PollingApp" className="Sidebar-links" onClick={handleLogout}>Logout</Link>:<Link to="/PollingApp/Login" className="Sidebar-links" onClick={handleButton}>Login</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;