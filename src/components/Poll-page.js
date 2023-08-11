import { useEffect, useState} from "react";
import "../styles/Poll-page.css";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment} from "firebase/firestore";
import Loader from "./loader";

const PollPage = () => {
    const {id} = useParams();
    const [poll,setPoll] = useState({});
    const [option,setOption] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const getDocument = async()=>{
            try{
                const docRef = doc(db,"Poll",id);
                const D = await getDoc(docRef);
                setPoll({...D.data(),id:D.id});
            }
            catch{}
            finally{}
        }
        getDocument();
    },[id]);

    const handleSubmit = () => {
        try{
            const docRef = doc(db,"Poll",id);
            updateDoc(docRef,{
                ["Optionselected."+option]:increment(1),
            })
            alert("Your answer has been submitted!");
        }catch(err){
            alert("There was some error, please try again later!");
        }
        finally{
            navigate("/");
        }
    }

    const handleBack = () => {
        navigate("/");
    }
    const ans =poll.Answer;
    return(
        <div className="PollPage">
            <div className="PollPage-header">
                <button className="backBttn button" onClick={handleBack}>Back</button>
                <h5 className="PollPage-heading heading">{poll.Question}</h5>
            </div>
            {Object.values(poll).length===0?<Loader></Loader>:
            <div className="PollPage-body">
                <div className="PollPage-form">
                    <label htmlFor="answer" className="form-heading subheading">Choose an option:</label>
                    {ans?.map((answer)=>{
                        return(<div className="radio" key={answer}><input name="answer" type="radio" value={answer} onChange={(e) => setOption(e.target.value)}/><h5 className="answer subheading">{answer}</h5></div>)
                    })}
                </div>
                {option!==undefined?<button onClick={handleSubmit} className="submit-bttn button" >Submit</button>:<button className="poll-page-submit submit-bttn button" >Submit</button>}
            </div>
            }
        </div>
    );
}

export default PollPage;