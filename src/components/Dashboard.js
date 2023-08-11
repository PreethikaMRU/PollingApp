import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { useEffect, useState,useRef } from "react";
import { collection, onSnapshot, query,doc} from "firebase/firestore";
import { auth, db} from "../firebase";
import Loader from "./loader";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [polls,setPolls] = useState([]);
    const navigate = useNavigate();
    const [empty,setEmpty] = useState(true);
    const outletRef = useRef();
    useEffect(()=>{
        try{
            const docRef = doc (db,"User",user.email);
            const q = query(collection(docRef,"Pollscreated"));
            const unsubscribe = onSnapshot(q,(Qs)=>{
                let p = [];
                if(Qs.docs.length===0){
                    console.log(Qs.docs.length);
                    setEmpty(false);
                }
                else{
                    setEmpty(false);
                    Qs.forEach((d)=>{
                        p.push({...d.data(),id:d.id});
                    });
                    setPolls(p);
                }
            });
            return()=>unsubscribe;
        }
        catch(err){
        }
    },[user])

    const handleBttn = () =>{
        navigate("/");
    }

    return(
        <div className="Dashboard">
            <div className="dashboard-title">
                <button className="backBttn button" onClick={handleBttn}>Back</button>
                <h5 className="dashboard-heading heading">DASHBOARD</h5>
            </div>
            <Link to="/Newpoll"><button className="create-poll-bttn button">+ Create new poll</button></Link>
            {empty===false?
            <div className="dashboard-body">
                {polls.length!==0?
                <div className="poll-cont">
                    <h5 className="view-report highlight" ref={outletRef}>Click on a poll to view the report!</h5>
                    <div className="poll-cont-body">
                        <div className="Poll-list-cont">
                            {polls.map((poll) => {
                            return(
                                <Link to={`Report/${poll.PollID}`} key={poll.PollID} className="dashboard-poll-link heading">
                                    <span className="dashboard-poll">{poll.Question}</span>
                                </Link>)
                            })}
                        </div>
                        <div className="outlet">
                            <Outlet/>
                        </div>
                    </div>
                </div>
                :
                <div className="no-poll-cont">
                    <h5 className="no-poll highlight">You haven't created any polls!</h5>
                </div>}
            </div>
            :
            <Loader></Loader>}
        </div>
    );
}

export default Dashboard;