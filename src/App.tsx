import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SportList from './route/SportList';
import CreateSportItem from './route/CreateSportItem';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateSportItem />,
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
