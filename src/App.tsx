import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function App() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />,
      path: "/",
      children: [
        { path: "/", element: <Home /> },
        { path: "/history", element: <History /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </ThemeProvider>
  );
}
