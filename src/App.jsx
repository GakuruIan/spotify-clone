import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Content from "./Components/Content/Content";
import Landing from "./Pages/Landing/Landing";
import Main from "./Pages/Main/Main";
import SpotifyUI from "./Pages/SpotifyUI/SpotifyUI";
import { MenuProvider } from "./Context";
import Artist from "./Pages/Artist/Artist";
import Categories from "./Pages/Categories/Categories";
import CategoryPage from "./Pages/Category/CategoryPage";
import Playlist from "./Pages/Playlist/Playlist";
import Search from "./Pages/Search/Search";
import Userplaylist from "./Pages/User/UserPlaylist/Userplaylist";
import PlaylistTracks from "./Pages/Playlist/PlaylistTracks";
import Track from "./Pages/Track/Track";
import Album from "./Pages/Album/Album";


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
          path:"/album/:id",
          element:<Album/>
        },
        {
           path:"/artist/:id",
           element:<Artist/>
        },
        {
          path:'/categories',
          element:<Categories/>
        },
        {
          path:'/category/:id',
          element:<CategoryPage/>
        },
        {
          path:'/playlist/:id',
          element:<Playlist/>
        },
        {
          path:'/music',
          element:<SpotifyUI/>
        },
        {
          path:'/search',
          element:<Search/>
        },
        {
          path:'/me/playlist',
          element:<Userplaylist/>
        },
        {
          path:'/playlist/:id/tracks',
          element:<PlaylistTracks/>
        },
        {
          path:'/track/:id',
          element:<Track/>
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
