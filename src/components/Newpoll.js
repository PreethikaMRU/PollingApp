import { useEffect, useState, useRef } from "react";
import "../styles/Newpoll.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth,db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Newpoll = () => {
    const [user] = useAuthState(auth);
    const [question,setQuestion] = useState("");
    const [option1,setOption1]=useState("");
    const [option2,setOption2]=useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]=useState("");
    const navigate = useNavigate();
    const submitRef = useRef();
    const qerrorRef = useRef();
    const error1Ref = useRef();
    const error2Ref = useRef();
    const error3Ref = useRef();
    const error4Ref = useRef();

    useEffect (() => {
        if(option1 && option2 && option3 && option4 && question!==""){
            submitRef.current.style.backgroundColor = "#FFE227";
            submitRef.current.style.pointerEvents = "all";
            submitRef.current.style.color = "#4d375d";
        }
        if(option1 ==="" | option2 === "" | option3 ==="" | option4 ==="" | question === ""){
            submitRef.current.style.backgroundColor = "#eee";
            submitRef.current.style.pointerEvents = "none";
            submitRef.current.style.color = "#aaa";
        }
        if(question!==""){
            qerrorRef.current.style.display="none";
        }
        if(option1!==""){
            error1Ref.current.style.display="none";
        }
        if(option2!==""){
            error2Ref.current.style.display="none";
        }
        if(option3!==""){
            error3Ref.current.style.display="none";
        }
        if(option4!==""){
            error4Ref.current.style.display="none";
        }
    },[option1,option2,option3,option4,question])

    const submitPoll = async() => {
        try{
        const collectionRef = collection(db,"Poll");
        const d = await addDoc(collectionRef,{
            Answer:[option1,option2,option3,option4],
            Question:question,
            Creator:user.uid,
            Optionselected:{[option1]:0,[option2]:0,[option3]:0,[option4]:0},
        })
        const docRef = doc(db,"User",user.email);
        await addDoc(collection(docRef,"Pollscreated"),{
            PollID:d.id,
            Question:question
        })
        alert(`Your poll ${question} has been created successfully!`);
        }
        catch(err){
            alert("Sorry there was some error, please try again later");
        }
        finally{
            setQuestion("");
            setOption1("");
            setOption2("");
            setOption3("");
            setOption4("");
            navigate("/PollingApp");
        }
    }

    const handleBack = () => {
        navigate("/PollingApp");
    }

    const handleBlur  = (ele) => {
        if(ele === "question" && question===""){
            qerrorRef.current.style.display = "block";
        }
        if (ele === "option1" && option1===""){
            error1Ref.current.style.display="block";
        }
        if (ele === "option2" && option2===""){
            error2Ref.current.style.display="block";
        }
        if (ele === "option3" && option3===""){
            error3Ref.current.style.display="block";
        }
        if (ele === "option4" && option4===""){
            error4Ref.current.style.display="block";
        }
    }


    return(
        <div className="Newpoll">
            <div className="Newpoll-heading">
                <button className="backBttn button" onClick={handleBack}>Back</button>
                <h5 className="Newpoll-title heading">Create new poll!</h5>
            </div>
            <div className="form">
                <div className="question-container">
                    <div className="question">
                        <label htmlFor="question" className="subheading">Question:</label>
                        <input name="question" type="text" value={question} onChange={(e)=>{setQuestion(e.target.value)}} className="input" placeholder="Enter Question" onBlur={()=>handleBlur("question")}></input>
                    </div>
                    <div className="error" ref={qerrorRef}>
                            <h5 className="error-text">Please enter a valid question.</h5>
                    </div>
                </div>

                <h5 className="option subheading">Options:</h5>

                <div className="option-container">
                    <div className="options">
                        <div className="text">
                            <label htmlFor="1" className="options-heading subheading">First:</label>
                            <input name="1" id="1" type="text" value={option1} onChange={(e)=>setOption1(e.target.value)} className="input" placeholder="Enter First Option" onBlur={()=>handleBlur("option1")}></input>
                        </div>
                        <div className="error" ref={error1Ref}>
                            <h5 className="error-text">Please enter a valid option.</h5>
                        </div>
                    </div>
                    <div className="options">
                        <div className="text">
                            <label htmlFor="2" className="options-heading subheading">Second:</label>
                            <input name="2" id="2" type="text" value={option2} onChange={(e)=>setOption2(e.target.value)} className="input" placeholder="Enter Second Option" onBlur={()=>handleBlur("option2")}></input>
                        </div>
                        <div className="error" ref={error2Ref}>
                            <h5 className="error-text">Please enter a valid option.</h5>
                        </div>
                    </div>
                    <div className="options">
                        <div className="text">
                            <label htmlFor="3" className="options-heading subheading">Third:</label>
                            <input name="3" id="3" type="text" value={option3} onChange={(e)=>setOption3(e.target.value)} className="input" placeholder="Enter Third Option" onBlur={()=>handleBlur("option3")}></input>
                        </div>
                        <div className="error" ref={error3Ref}>
                            <h5 className="error-text">Please enter a valid option.</h5>
                        </div>
                    </div>
                    <div className="options">
                        <div className="text">
                            <label htmlFor="4" className="options-heading subheading">Fourth:</label>
                            <input name="4" id="4" type="text" value={option4} onChange={(e)=>setOption4(e.target.value)} className="input" placeholder="Enter Fourth Option" onBlur={()=>handleBlur("option4")}></input>
                        </div>
                        <div className="error" ref={error4Ref}>
                            <h5 className="error-text">Please enter a valid option.</h5>
                        </div>
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit-bttn button submit" onClick={()=>submitPoll()} ref={submitRef}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Newpoll;