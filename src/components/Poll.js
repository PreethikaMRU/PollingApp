import { useRef } from "react";
import "../styles/Poll.css";
import { Link } from "react-router-dom";

const Poll = ({poll}) => {
    const pollRef = useRef();
    const handleHover = () => {
        pollRef.current.style.transform = "scale(1.04)";
    }

    const removeHover = () => {
        pollRef.current.style.transform = "scale(1)";
    }

    const handleLink = () => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        })
    }
    return(
        <div className="Poll" ref={pollRef}>
            <div className="Poll-qs-cont">
                <h5 className="Poll-qs heading">{poll.Question}</h5>
            </div>
            <Link to={`/PollingApp/Poll/${poll.id}`} className="Poll-link-cont subheading" onMouseEnter={handleHover} onMouseLeave={removeHover} onClick={handleLink}>
                <h5 className="Poll-link">{`Vote now >>>`}</h5>
            </Link>
        </div>
    );
}

export default Poll;