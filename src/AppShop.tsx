import { RouterProvider } from "react-router"
import { appRouter } from "./router/AppRouter"
import { ThemeProvider } from "./components/theme/ThemeProvider"
import { CartProvider } from "./context/CartContext"

export const AppShop = () => {
  return (
    <CartProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </CartProvider>
  )
}
