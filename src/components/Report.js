import { useEffect, useState } from "react";
import "../styles/Report.css";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc,getDoc } from "firebase/firestore";
import Graph from "./Graph";

const Report = () => {
    const {id} = useParams();
    const [poll,setPoll]=useState({});
    const [answer1,setAnswer1] = useState();
    const [answer2,setAnswer2] = useState();
    const [answer3,setAnswer3] = useState();
    const [answer4,setAnswer4] = useState();
    const [count1,setCount1] = useState();
    const [count2,setCount2] = useState();
    const [count3,setCount3] = useState();
    const [count4,setCount4] = useState();

    useEffect(()=>{
        const getDocument = async()=>{
            try{
                const docRef = doc(db,"Poll",id);
                const D = await getDoc(docRef);
                setPoll({...D.data(),id:D.id});
            }
            catch(err){
                console.log(err);
            }
            finally{
            }
        }
        getDocument();
    },[id]);

    const timeOut = setTimeout(()=>{
        try{
            setAnswer1(poll?.Answer["0"]);
            setAnswer2(poll?.Answer["1"]);
            setAnswer3(poll?.Answer["2"]);
            setAnswer4(poll?.Answer["3"]);
            setCount1(poll.Optionselected[answer1]);
            setCount2(poll.Optionselected[answer2]);
            setCount3(poll.Optionselected[answer3]);
            setCount4(poll.Optionselected[answer4]);
        }
        catch(err){
            
        }
    },);

    return(
        <div className="Report">
            {poll!==undefined?
            <Graph
                poll={poll}
                answer1={answer1}
                answer2={answer2}
                answer3={answer3}
                answer4={answer4}
                count1={count1}
                count2={count2}
                count3={count3}
                count4={count4}
            ></Graph>
            :
            ""}
        </div>
    );
}

export default Report;