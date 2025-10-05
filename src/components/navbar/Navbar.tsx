import { Menu, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { Link, useLocation } from "react-router" // o "react-router-dom"
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

/* ========= Sucursales y WhatsApp ========= */
type BranchId = "lpz" | "obg" | "hmo" | "mxl" | "nog"

const BRANCHES: Record<
    BranchId,
    { label: string; whatsappIntl: string; comingSoon?: boolean }
> = {
    lpz: { label: "La Paz", whatsappIntl: "526122003331" },          // 612 200 33 31
    obg: { label: "Cd. Obregón", whatsappIntl: "526441405742" },      // 644 140 5742
    hmo: { label: "Hermosillo", whatsappIntl: "526421564947" },       // 642 156 4947
    mxl: { label: "Mexicali", whatsappIntl: "526861005501" },         // (686) 100 5501
    nog: { label: "Nogales (Próx.)", whatsappIntl: "526311256254", comingSoon: true }, // 631 125 6254
}

/* Mensaje profesional con sucursal + textarea */
function buildWhatsappMessage(branchId: BranchId, rawMsg: string) {
    const branchLabel = BRANCHES[branchId]?.label ?? "Sucursal"
    const userMsg = rawMsg?.trim()

    const text = [
        "Hola, me gustaría solicitar una cotización.",
        "",
        `Sucursal: ${branchLabel}`,
        "",
        "Detalles del pedido:",
        "• Producto/Modelo: _____________________",
        "• Tallas/Colores: _______________________",
        "• Cantidad aproximada: _________________",
        "• Personalización (si aplica): _________",
        "",
        "Notas adicionales:",
        userMsg ? userMsg : "—",
        "",
        "¿Podrían apoyarme con disponibilidad, tiempos y costo total? ¡Gracias!",
    ].join("\n")

    return encodeURIComponent(text)
}

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isQuoteOpen, setIsQuoteOpen] = useState(false)
    const [branch, setBranch] = useState<BranchId | "">("")
    const [message, setMessage] = useState("")
    const { items, isOpen, openCart, closeCart, removeItem, clearCart } = useCart()

    const hasItems = items.length > 0

    const onSubmitQuote = (e: React.FormEvent) => {
        e.preventDefault()
        if (!branch) return

        const phone = BRANCHES[branch].whatsappIntl // ya en formato internacional 52...
        const encoded = buildWhatsappMessage(branch as BranchId, message)
        const href = `https://wa.me/${phone}?text=${encoded}`

        setIsQuoteOpen(false)
        window.open(href, "_blank", "noopener,noreferrer")
    }

    const { pathname } = useLocation()
    const navLinkClass = (to: string) => {
        const active = pathname === to || pathname.startsWith(`${to}/`)
        return [
            "relative inline-block py-1 font-medium transition-colors",
            active ? "text-emerald-600" : "text-foreground hover:text-emerald-500",
            "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-emerald-500",
            "after:transition-[width] after:duration-300",
            active ? "after:w-full" : "after:w-0 hover:after:w-full",
        ].join(" ")
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
                        <Link to="/quienes-somos" className={navLinkClass("/quienes-somos")}>
                            Quienes Somos
                        </Link>
                        <Link to="/sucursales" className={navLinkClass("/sucursales")}>
                            Sucursales
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        <Button
                            className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                            onClick={() => setIsQuoteOpen(true)}
                        >
                            Solicitar cotización
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
                            <Link to="/quienes-somos" className={navLinkClass("/quienes-somos")}>
                                Quienes Somos
                            </Link>
                            <Link to="/sucursales" className={navLinkClass("/sucursales")}>
                                Sucursales
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

            {/* Drawer del carrito (sin cambios relevantes) */}
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
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => removeItem(item.product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
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
                        <DialogTitle>Solicitar cotización</DialogTitle>
                        <DialogDescription>
                            Selecciona la sucursal y cuéntanos brevemente tu pedido. Te contactaremos por WhatsApp.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="grid gap-4" onSubmit={onSubmitQuote}>
                        <div className="grid gap-3">
                            <Label htmlFor="store">Sucursal</Label>
                            <Select
                                value={branch}
                                onValueChange={(v) => setBranch(v as BranchId)}
                            >
                                <SelectTrigger id="store" className="w-full">
                                    <SelectValue placeholder="Elige una sucursal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lpz">La Paz</SelectItem>
                                    <SelectItem value="obg">Cd. Obregón</SelectItem>
                                    <SelectItem value="hmo">Hermosillo</SelectItem>
                                    <SelectItem value="mxl">Mexicali</SelectItem>
                                    <SelectItem value="nog">Nogales (Próx.)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="message">Mensaje</Label>
                            <Textarea
                                id="message"
                                placeholder="Ej. Camisetas oversize (negro/blanco), 50 pzas, impresión 1 tinta al frente."
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
                                disabled={!branch}
                                aria-disabled={!branch}
                            >
                                Cotizar por WhatsApp
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </header>
    )
}
