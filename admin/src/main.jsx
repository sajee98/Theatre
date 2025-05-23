
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Router from './Router.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 
        <Router />
 </BrowserRouter>
  

)
