import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import SignIn from "../pages/Home/SignIn/SignIn";
import SignUp from "../pages/Home/SignUp/SignUp";

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
            path:'/signIn',
            Component:SignIn
        },
        {
            path:'/signUp',
            Component: SignUp
        }
    ]
  },
]);