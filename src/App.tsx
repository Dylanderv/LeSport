import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SportList from './route/SportList';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SportList />,
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
