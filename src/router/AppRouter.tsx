
import { createBrowserRouter } from "react-router"
import { Layout } from '../layout/Layout';
import { HomePage } from "@/home/pages/HomePage";
import { ProductsPage } from "@/products/pages/ProductsPage";
import { InfoPage } from "@/info/pages/InfoPage";
import { BranchesPage } from "@/branches/pages/BranchesPage";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            // {
            //     path: "productos",
            //     element: <ProductsPage />
            // },
            {
                path: "quienes-somos",
                element: <InfoPage />
            },
            {
                path: "sucursales",
                element: <BranchesPage />
            }
        ]
    },
])