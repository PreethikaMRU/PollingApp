import "../styles/Login.css";
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import google from "../images/google.png";

const Login = ({user}) => {
    const navigate = useNavigate();
    
    const timeOut = setTimeout(()=>{
        if(user){
            navigate("/Loggedin");
        }
        else{
        }
    },);

    const handleLogin = () => {
        try{
            const provider = new GoogleAuthProvider();
            signInWithRedirect(auth,provider);
            navigate("/Loggedin")
        }
        catch{}
        finally{
        }
    }


    return(
        <div className="Login">
            {user?<h5>Please wait redirecting to home page!</h5>:
            <div className="Login-body">
            <h5 className="Login-heading subheading">Login using your google account to continue!</h5>
            <button className='heading signin button' onClick={handleLogin}><img alt="google" src={google} width="40" height="40"/>Sign in with Google</button>
            </div>}
        </div>
    );
}

export default Login;