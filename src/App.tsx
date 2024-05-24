import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SportList from './route/SportList';
import CreateSportItem from './route/CreateSportItem';
import ListCreatedItems from './route/ListCreatedItems';
import CreateSection from './route/CreateSection';
import ListSections from './route/ListSections';

export const router = createBrowserRouter([
  {
    path: "/list",
    // element: <CreateSportItem />,
    element: <ListCreatedItems />
  },
  {
    path: "/create",
    element: <CreateSportItem />,
  },
  {
    path: "/section",
    element: <CreateSection />,
  },

  {
    path: "/sport-list",
    element: <SportList />,
  },


  {
    path: "/list-sections",
    element: <ListSections />,
  },
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
