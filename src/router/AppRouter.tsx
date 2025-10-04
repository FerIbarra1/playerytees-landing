
import { createBrowserRouter } from "react-router"
import { Layout } from '../layout/Layout';
import { HomePage } from "@/home/pages/HomePage";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    },
])