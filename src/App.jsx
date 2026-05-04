import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import CourseList from './pages/CourseList'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import UpdateCourse from './pages/UpdateCourse'
import AddCourse from './pages/AddCourse'
import ProtectedRoutes from './Protected Routes/ProtectedRoutes'

const App = () => {
    let myRouter = createBrowserRouter([
        {
            path:'/',
            element:<Layout/>,
            children:[
                {
                    path:'/',
                    element:<ProtectedRoutes>
                        <CourseList />
                    </ProtectedRoutes>
                },
                {
                    path:'/login',
                    element:<Login />
                },
                {
                    path:'/signup',
                    element:<SignUp />
                },
                {
                    path:'/cart',
                    element:<Cart />
                },
                {
                    path:'/update',
                    element:<UpdateCourse />
                },
                {
                    path:'/add',
                    element:<AddCourse />
                }
            ]
        }
    ])
  return (
    
    <RouterProvider router={myRouter}></RouterProvider>
  )
}

export default App