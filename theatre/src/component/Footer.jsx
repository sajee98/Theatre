import "./FooterStyles.css";

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
            <div>
                <h1>
                    Sajeemax
                </h1>
                <p>
                Choose Your Favourite Movie
                </p>
            </div>
          
            <div>
                <a href="/">
                    <i className="fa-brands fa-facebook-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-instagram-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-snapchat-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-twitter-square"></i>
                </a>
            </div>

            </div>
            <div className="bottom">
            <div>
                <h4>projects</h4>
                <a href="/">changelog</a>
                <a href="/">License</a>
                <a href="/">Status</a>
                <a href="/">AllVersions</a>
            </div>
            <div>
                <h4>Community</h4>
                <a href="/">Github</a>
                <a href="/">Issues</a>
                <a href="/">project</a>
                <a href="/">Twitter</a>
            </div> 
            <div>
                <h4>Help</h4>
                <a href="/">Support</a>
                <a href="/">Troubleshooting</a>
                <a href="/">Contact us</a>
                
            </div>
            <div>
                <h4>others</h4>
                <a href="/">Terms of Services</a>
                <a href="/">Privacy policy</a>
                <a href="/">License</a>
            </div>
            </div>
        </div>
    )

}

export default Footer;