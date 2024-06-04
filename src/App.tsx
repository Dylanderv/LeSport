import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SportList from './route/SportList';
import CreateSportItem from './route/CreateSportItem';
import ListCreatedItems from './route/ListCreatedItems';
import CreateSection from './route/CreateSection';
import ListSections from './route/ListSections';
import Routes from './Components/Routes';
import ViewSection from './route/ViewSection';
import CreatePlaylist from "./route/CreatePlaylist.tsx";
import ListPlaylists from "./route/ListPlaylists.tsx";
import ConfigurePlaylist from "./route/ConfigurePlaylist.tsx";
import ViewPlaylist from "./route/ViewPlaylist.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <CreateSportItem />,
    element: <Routes />
  },
  {
    path: "/items",
    // element: <CreateSportItem />,
    element: <ListCreatedItems />
  },
  {
    path: "/items/create",
    element: <CreateSportItem />,
  },
  {
    path: "/test",
    element: <SportList />,
  },
  {
    path: "/sections",
    element: <ListSections />,
  },
  {
    path: "/sections/create",
    element: <CreateSection />,
  },
  {
    path: "/sections/:id",
    element: <ViewSection />,
  },
  {
    path: "/playlists",
    element: <ListPlaylists />,
  },
  {
    path: "/playlists/create",
    element: <CreatePlaylist />,
  },
  {
    path: "/playlists/:id/configure",
    element: <ConfigurePlaylist />,
  },
  {
    path: "/playlists/:id",
    element: <ViewPlaylist />,
  },
  // {
  //   path: "/sections/:sectionId/items/:itemId/configurator",
  //   element: <SportItemConfigurator />,
  // },
]);


function App() {
  return (
    <CssVarsProvider defaultMode="dark">
    <CssBaseline />
    {/* <ModeToggle /> */}
    <RouterProvider router={router} />
    </CssVarsProvider>
  );
}

export default App
