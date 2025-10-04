import { RouterProvider } from "react-router"
import { appRouter } from "./router/AppRouter"
import { ThemeProvider } from "./components/theme/ThemeProvider"

export const AppShop = () => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  )
}
