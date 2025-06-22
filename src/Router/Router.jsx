import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import SignIn from "../pages/Home/SignIn/SignIn";
import SignUp from "../pages/Home/SignUp/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Logout from "../pages/Authentication/LogOut/LogOut";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true, 
            Component: Home
        },
        {
            path:'/about',
            Component:AboutUs
        },
        {
          path: '/coverage',
          Component: Coverage
        }
        // {
        //     path:'/signIn',
        //     Component:SignIn
        // },
        // {
        //     path:'/signUp',
        //     Component: SignUp
        // }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path:'/logout',
        Component: Logout
      }

    ]
  }
]);