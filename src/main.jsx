import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css';

import {RouterProvider} from "react-router";
import { router } from './Router/Router.jsx';
import Aos from 'aos';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist w-11/12 mx-auto'>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </div>
  </StrictMode>,
)
