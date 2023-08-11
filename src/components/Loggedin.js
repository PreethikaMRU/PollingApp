import { useNavigate } from "react-router-dom";
import { setDoc, collection, getDoc, doc} from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./loader";
import "../styles/Loggedin.css";
const Loggedin = ({user}) => {
    const navigate = useNavigate();
    setTimeout(()=>{
        if(user){
            checkUser();
            navigate("/");
        }
        else{
        }
    },1000);
    const checkUser = async() => {
        const userscollection = collection(db,"User");
        const docRef = await getDoc(doc(userscollection,user.email));
        if(!docRef.data()){
            setDoc(doc(userscollection,user.email),{
                        Username: user.displayName,
                        email: user.email,
                        Userid: user.uid,
                    })
        }
    }
    navigate("/Login");
    return(
        <div className="Loggedin">
            <h5 className="highlight">Please wait redirecting!</h5>
            <Loader />
        </div>
    );
}

export default Loggedin;