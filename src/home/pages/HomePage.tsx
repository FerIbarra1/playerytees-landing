import { Button } from "@/components/ui/button"
import { ArrowRight, Package, Users, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { SliderBanner } from "../components/sliders/SliderBanner"

export const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])
    return (
        <section className="relative lg:pt-10 overflow-hidden">

            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className={`space-y-6 lg:space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-full text-secondary font-medium text-sm">
                            <Zap className="h-4 w-4" />
                            <span>Venta al Mayoreo • Envíos a Todo México</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-tight text-balance">
                            Ropa básica de calidad al mejor precio de mayoreo
                        </h1>

                        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
                            Especialistas en venta mayorista de camisetas deportivas y uniformes de trabajo. Calidad premium, precios
                            competitivos y entregas rápidas.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 px-8">
                                Ver Productos
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent">
                                Solicitar Cotización
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Package className="h-5 w-5" />
                                    <span className="text-2xl lg:text-3xl font-bold">500+</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Pedidos Mensuales</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Users className="h-5 w-5" />
                                    <span className="text-2xl lg:text-3xl font-bold">200+</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Clientes Activos</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
                        <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                            {/* Main Image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden">
                                <img
                                    src="/Portada1.jpg"
                                    alt="Equipo deportivo con camisetas"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                                        <Package className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Pedido Mínimo</p>
                                        <p className="text-sm text-muted-foreground">Desde 50 piezas</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float"
                                style={{ animationDelay: "1s" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Envío Express</p>
                                        <p className="text-sm text-muted-foreground">24-48 horas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SliderBanner />
            </div>
        </section>
    )
}
