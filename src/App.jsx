import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Content from "./Components/Content/Content";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main/Main";
import SpotifyUI from "./Pages/SpotifyUI/SpotifyUI";
import { MenuProvider } from "./Context";


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
          path:'/main/music',
          element:<SpotifyUI/>
        }
      ]
    }
  ]);

  return (
    <>
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </>
  )
}

export default App
