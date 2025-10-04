import { Footer } from "@/components/footer/Footer"
import { Navbar } from "@/components/navbar/Navbar"
import { Outlet } from "react-router"

export const Layout = () => {
    return (
        <main className="min-h-screen font-noto-Sans">
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    )
}
