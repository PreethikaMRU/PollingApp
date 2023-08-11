import "../styles/Home.css";
import Poll from "./Poll";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

function Home(){
    const [user] = useAuthState(auth);

    const [polls,setPolls] = useState([]);

    useEffect (()=>{
        const q = query(collection(db,"Poll"));
        const unsubscribe = onSnapshot(q,(polls)=>{
            let p = [];
            polls.forEach((doc) => {
                p.push({...doc.data(),id:doc.id})
            })
            setPolls(p);
        })
        return()=>unsubscribe;
    },[])

    return(
        <div className="Home">
            <h5 className="home-title title">POLL-iT</h5>
            {user? <Link to="/PollingApp/Newpoll"><button className="create-poll-bttn button">+ Create your new poll</button></Link>:<h5 className="home-highlight highlight">Log in to create your poll!</h5>}
            {polls.length!==0?
            <div className="Poll-list-cont">
                <div className="Poll-item">
                    {polls.map((poll) => {
                        return (
                                <Poll poll = {poll} key={poll.id}></Poll>
                            );
                    })}
                </div>
            </div>
            :<Loader></Loader>}
        </div>
    );
}

export default Home;