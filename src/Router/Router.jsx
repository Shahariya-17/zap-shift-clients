import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import LogOut from "../pages/Authentication/LogOut.jsx/LogOut";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";



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
          Component: Coverage,
          loader:() => fetch('/serviceCenter.json')
        },
        {
          path: '/sendParcel',
          element: <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>,
          loader:() => fetch('/serviceCenter.json')
        }

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
        Component: LogOut 
      }

    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
      children: [
        {
          path:'myParcels',
          Component: MyParcels
        },
        {
          path:'payment/:id',
          Component: Payment
        }
      ]
  }
]);