import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { Link } from "react-router"
import { ModeToggle } from "../theme/ThemeToggle"

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/">
                        <img src="/LogoPlayerytees.png" alt="Logo" className="h-10 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/productos" className="text-foreground hover:text-primary transition-colors font-medium">
                            Productos
                        </Link>
                        <Link to="/quienes-somos" className="text-foreground hover:text-primary transition-colors font-medium">
                            Quienes Somos
                        </Link>
                        <Link to="/sucursales" className="text-foreground hover:text-primary transition-colors font-medium">
                            Sucursales
                        </Link>
                        <Link to="/distribuidores" className="text-foreground hover:text-primary transition-colors font-medium">
                            Distribuidores
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        <Button className="hidden sm:flex bg-emerald-500 text-secondary-foreground">
                            Cotizar Ahora
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
                        <nav className="flex flex-col gap-4">
                            <Link to="/productos" className="text-foreground hover:text-primary transition-colors font-medium">
                                Productos
                            </Link>
                            <Link to="/quienes-somos" className="text-foreground hover:text-primary transition-colors font-medium">
                                Quienes Somos
                            </Link>
                            <Link to="/sucursales" className="text-foreground hover:text-primary transition-colors font-medium">
                                Sucursales
                            </Link>
                            <Link to="/distribuidores" className="text-foreground hover:text-primary transition-colors font-medium">
                                Distribuidores
                            </Link>
                            <Button className="w-full bg-emerald-500 text-secondary-foreground">
                                Cotizar Ahora
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
