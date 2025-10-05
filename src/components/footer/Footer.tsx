import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    BadgeCheck,
    Facebook,
    Instagram,
    Youtube,
} from "lucide-react"
import { useMemo } from "react"

export const Footer = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), [])

    return (
        <footer className="bg-card border-t border-border text-foreground">
            <div className="container mx-auto px-4 lg:px-8 py-12">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Brand / Value props */}
                    <div>
                        <Link to="/" className="inline-flex ">
                            <img src="/LogoPlayerytees.png" alt="Logo" className="h-10 w-auto" />
                        </Link>

                        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
                            Mayoreo de básicos de alta rotación: playeras, polos y sudaderas para marcas, equipos y negocios en todo México.
                            Enfoque en calidad, tiempos y precio competitivo.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h4 className="text-base font-semibold">Explorar</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {/* <li>
                                <Link to="/productos" className="text-muted-foreground hover:text-primary transition-colors">
                                    Productos
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                                    Quiénes somos
                                </Link>
                            </li>
                            <li>
                                <Link to="/sucursales" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sucursales
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Cotización / Contacto / Newsletter */}
                    <div>
                        {/* <h4 className="text-base font-semibold">Cotizaciones y contacto</h4>
                        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +52 642 853 4771</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> contacto@tusitio.mx</p>
                        </div>

                        <Button
                            onClick={openWhatsApp}
                            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110"
                        >
                            Cotizar por WhatsApp
                        </Button> */}

                        <div className="mt-6">
                            <p className="text-sm font-medium">Recibe novedades y promociones</p>
                            <div className="mt-3 flex gap-2">
                                <Input type="email" placeholder="tu@correo.com" />
                                <Button variant="outline">Suscribirme</Button>
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                Sin spam. Puedes darte de baja cuando quieras.
                            </p>
                        </div>

                        {/* Social */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/playerytees/"
                                aria-label="Instagram"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.facebook.com/playerytees"
                                aria-label="Facebook"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.youtube.com/@playerytees4335"
                                aria-label="YouTube"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-10">
                    <Separator />
                    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
                        <p>© {currentYear} PlayerYTees. Todos los derechos reservados.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link to="/terminos" className="hover:text-primary">Términos y condiciones</Link>
                            <Link to="/privacidad" className="hover:text-primary">Aviso de privacidad</Link>
                            <Link to="/devoluciones" className="hover:text-primary">Devoluciones y cambios</Link>
                            <Link to="/facturacion" className="hover:text-primary">Facturación</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
