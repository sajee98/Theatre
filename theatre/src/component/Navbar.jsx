import { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { MenuData } from "./MenuData";

 import "./Navbar.css";


class Navbar extends Component{
    state = {clicked : false};
    handleClick = () =>{
        this.setState({clicked : !this.state.clicked});
    }
    render (){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">SajeeMaX</h1>
                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>

                            <Link className={item. cNAme} to={item.URL}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                         </li>
                            
                        );
                    })}
                     <button>SignUP</button>
                </ul>
            </nav>
        )
    }
    
}
export default Navbar;