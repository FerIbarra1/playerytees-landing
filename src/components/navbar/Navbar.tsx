import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { Link } from "react-router"
import { ModeToggle } from "../theme/ThemeToggle"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// const WHATSAPP_NUMBER_INTL = "526622914052" // +52 662 291 4052
const WHATSAPP_NUMBER_INTL = "526428534771" // +52 642 853 4771

const STORE_LABELS: Record<string, string> = {
    centro: "Centro - Hermosillo",
    norte: "Sucursal Norte",
    sur: "Sucursal Sur",
}

function buildWhatsappMessage(params: { store: string; message: string }) {
    const storeLabel = STORE_LABELS[params.store] ?? "No especificada"
    const text = [
        "Hola, me gustaría solicitar una cotización.",
        "",
        `Sucursal: ${storeLabel}`,
        "",
        "Detalles del pedido:",
        "• Producto/Modelo: _____________________",
        "• Tallas/Colores: _______________________",
        "• Cantidades aproximadas: _______________",
        "• Personalización (si aplica): __________",
        "• Fecha estimada de entrega: ____________",
        "",
        "Notas adicionales:",
        params.message.trim() ? params.message.trim() : "—",
        "",
        "¿Podrían apoyarme con disponibilidad, tiempos y costo total? ¡Gracias!"
    ].join("\n")

    return encodeURIComponent(text)
}

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isQuoteOpen, setIsQuoteOpen] = useState(false)
    const [store, setStore] = useState<string>("")
    const [message, setMessage] = useState("")

    const onSubmitQuote = (e: React.FormEvent) => {
        e.preventDefault()

        const encoded = buildWhatsappMessage({ store, message })
        const href = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encoded}`

        setIsQuoteOpen(false)
        window.open(href, "_blank", "noopener,noreferrer")
    }

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
                        <Button
                            className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Cotizar Ahora
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menú"
                        >
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
                            <Button
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                                onClick={() => setIsQuoteOpen(true)}
                            >
                                Cotizar Ahora
                            </Button>
                        </nav>
                    </div>
                )}
            </div>

            {/* Dialog Cotizar */}
            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Solicitar cotización</DialogTitle>
                        <DialogDescription>
                            Selecciona la tienda y cuéntanos brevemente tu pedido. Te contactaremos a la brevedad por WhatsApp.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="grid gap-4" onSubmit={onSubmitQuote}>
                        <div className="grid gap-3">
                            <Label htmlFor="store">Selecciona tienda</Label>
                            <Select value={store} onValueChange={(v) => setStore(v)}>
                                <SelectTrigger id="store" className="w-full">
                                    <SelectValue placeholder="Elige una sucursal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="centro">Centro - Hermosillo</SelectItem>
                                    <SelectItem value="norte">Sucursal Norte</SelectItem>
                                    <SelectItem value="sur">Sucursal Sur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="message">Mensaje</Label>
                            <Textarea
                                id="message"
                                placeholder="Ej. Camisetas oversize para staff (negro/blanco), 50 pzas, impresión 1 tinta al frente."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsQuoteOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                                disabled={!store}
                                aria-disabled={!store}
                            >
                                Cotizar ahora por WhatsApp
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </header>
    )
}
