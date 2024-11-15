import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.tsx";
import RootLayout from "./Pages/Root/Root.tsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import Table from "./Pages/TablePage/TablePage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />}, // index: true indicates that this is the root path
            {
                path: 'login',
                element: <ProtectedRoute showLogged = {false} element={<LoginPage /> } />
            },
            {
                path: '/table/:tableName',
                element: <ProtectedRoute showLogged = {true} element={<Table />} />},
        ]
    },

]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
