import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Content from "./Components/Content/Content";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main/Main";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>,
    },
    {
      path:'/main',
      element:<Main/>,
      children:[
        {
          path:"/main",
          element:<Content/>
        }
      ]
    }
  ]);

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
