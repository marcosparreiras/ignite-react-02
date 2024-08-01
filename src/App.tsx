import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/history", element: <History /> },
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </ThemeProvider>
  );
}
