import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Content from "./Components/Content/Content";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main/Main";
import SpotifyUI from "./Pages/SpotifyUI/SpotifyUI";


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
        },
        {
          path:'/main/ui',
          element:<SpotifyUI/>
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
