
import React from "react";
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData";

function Sidebar({openSidebarToggle, OpenSidebar}){

    return(

        <aside id="sidebar"  className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    Max Bookings 
                </div>
                <span className="icon close_icon" onClick={OpenSidebar}>X</span>
            </div>

                <ul className="sidebar-list">
                {MenuData.map((item, index) => {
                        return (
                            <li className={item.cNAme} key={index}>

                            <Link to={item.URL}>
                            
                            <i className={item.icon}> 
                             
                            </i>
                            {item.title} 
                            </Link>
                         </li>
                            
                        );
                    })}
                </ul>
                
        
        </aside>


    )
}


export default Sidebar;