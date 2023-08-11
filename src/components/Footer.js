import "../styles/Footer.css";

const Footer = () => {
    const handleScroll = () => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        })
    }
    return(
        <div className="Footer">
            <span onClick={handleScroll} className="scrollto heading">Scroll to top</span>
            <span className="copyright heading">Copyrights &#169; 2023 Preethika MRU</span>
        </div>
    );
}

export default Footer;