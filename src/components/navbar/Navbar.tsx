import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { useMemo, useState } from "react"
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
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "@/context/CartContext"

const WHATSAPP_NUMBER_INTL = "526428534771"
const STORE_LABELS: Record<string, string> = {
    centro: "Centro - Hermosillo",
    norte: "Sucursal Norte",
    sur: "Sucursal Sur",
}

function buildWhatsappMessage(params: { store: string; message: string }) {
    const storeLabel = STORE_LABELS[params.store] ?? "No especificada"
    const text = [
        "Hola, me gustaria solicitar una cotizacion.",
        "",
        `Sucursal: ${storeLabel}`,
        "",
        "Detalles del pedido:",
        "- Producto o modelo: _____________________",
        "- Tallas o colores: _______________________",
        "- Cantidades aproximadas: ________________",
        "- Personalizacion (si aplica): ____________",
        "- Fecha estimada de entrega: _____________",
        "",
        "Notas adicionales:",
        params.message.trim() ? params.message.trim() : "(sin notas adicionales)",
        "",
        "Podrian apoyarme con disponibilidad, tiempos y costo total? Gracias!",
    ].join("\n")

    return encodeURIComponent(text)
}

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isQuoteOpen, setIsQuoteOpen] = useState(false)
    const [store, setStore] = useState<string>("")
    const [message, setMessage] = useState("")
    const { items, count, isOpen, openCart, closeCart, removeItem, clearCart } = useCart()

    const displayCount = useMemo(() => {
        if (count > 99) return "99+"
        return String(count)
    }, [count])

    const hasItems = items.length > 0

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
                        <Button variant="ghost" size="icon" className="relative" onClick={openCart} aria-label="Abrir carrito">
                            <ShoppingCart className="h-5 w-5" />
                            {count > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-semibold text-primary-foreground">
                                    {displayCount}
                                </span>
                            )}
                        </Button>
                        <Button
                            className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Cotizar ahora
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menu"
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
                                Cotizar ahora
                            </Button>
                        </nav>
                    </div>
                )}
            </div>

            <Drawer open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
                <DrawerContent className="items-center">
                    <DrawerHeader>
                        <DrawerTitle>Tu carrito</DrawerTitle>
                        <DrawerDescription>
                            {hasItems ? "Revisa tus productos seleccionados." : "Tu carrito esta vacio."}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col justify-center md:min-w-3xl">

                        <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
                            {hasItems ? (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex items-start gap-4">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="h-16 w-16 rounded-md border border-border object-cover"
                                            />
                                            <div className="flex-1 space-y-1">
                                                <p className="font-semibold text-foreground">{item.product.title}</p>
                                                <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                                {/* <p className="text-sm text-muted-foreground">
                                                {currencyFormatter.format(item.product.price * item.quantity)}
                                            </p> */}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => removeItem(item.product.id)}
                                            >
                                                Quitar
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Cuando agregues productos desde la lista se mostraran aqui.
                                </p>
                            )}
                        </div>

                        <DrawerFooter>
                            {/* {hasItems && (
                            <div className="flex items-center justify-between text-sm font-medium text-foreground">
                                <span>Total estimado</span>
                                <span>{currencyFormatter.format(total)}</span>
                            </div>
                        )} */}
                            <Button
                                className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                                onClick={() => {
                                    if (!hasItems) return
                                    closeCart()
                                    setIsQuoteOpen(true)
                                }}
                                disabled={!hasItems}
                            >
                                Cotizar ahora
                            </Button>
                            <Button
                                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:brightness-110"
                                onClick={() => clearCart()}
                                disabled={!hasItems}
                            >
                                Limpiar carrito
                            </Button>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Dialog Cotizar */}
            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Solicitar cotizacion</DialogTitle>
                        <DialogDescription>
                            Selecciona la tienda y cuentanos brevemente tu pedido. Te contactaremos a la brevedad por WhatsApp.
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
                                placeholder="Ej. Camisetas oversize para staff (negro/blanco), 50 pzas, impresion 1 tinta al frente."
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


