import React from "react";
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsJustify, BsSearch, BsFillEnvelopeFill, BsPersonCircle}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Header({OpenSidebar}){
    return(

        <header className="header">
            <div className="menu-icon">
                <BsJustify className="icon" onClick={OpenSidebar} />
            </div>
            <div className="header-left">
                <BsSearch className="icon" />
            </div>
            <div className="header-right">
                <BsFillBellFill className="icon" />
                <BsFillEnvelopeFill className="icon" />
                <BsPersonCircle className="icon" />
            </div>
        </header>

    )
}


export default Header;