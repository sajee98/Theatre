
import { useState } from 'react'
import './Mainlayout.css'
import Sidebar from './Sidebar'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/contexprovider'

function Mainlayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const {user, token} = useStateContext();
  if (!token) {
    return <Navigate to = '/Login'></Navigate>
  }
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
  
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Outlet />
    </div>
  )
}

export default Mainlayout
