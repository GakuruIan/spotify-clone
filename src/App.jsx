import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Content from "./Components/Content/Content";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main/Main";
import SpotifyUI from "./Pages/SpotifyUI/SpotifyUI";
import { MenuProvider } from "./Context";
import Artist from "./Pages/Artist/Artist";


function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Landing/>,
    },
    {
      path:'/',
      element:<Main/>,
      children:[
        {
          path:"/",
          element:<Content/>
        },
        {
           path:"/artist/:id",
           element:<Artist/>
        },
        {
          path:'/music',
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
