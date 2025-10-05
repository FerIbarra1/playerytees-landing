import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"
import { Branches } from "@/mocks/Branch"
import { BranchesMap } from "../components/maps/BranchesMap"
import { BranchCard } from "../components/cards/BranchCard"

export const BranchesPage = () => {

    return (
        <main className="min-h-screen">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/banners/Banner4.jpg" alt="Mapa y sucursales" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-30">
                    <Badge className="bg-emerald-500 mb-3">Sucursales</Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white max-w-4xl">
                        Cerca de ti — Envíos a todo México
                    </h1>
                    <p className="mt-2 text-white/90 max-w-2xl">
                        Visítanos en tienda o cotiza por WhatsApp. Entregas ágiles y soporte personalizado para mayoreo.
                    </p>
                    <div className="mt-5 flex gap-3">
                        <Button className="text-primary-foreground text-lg !px-8 !py-6">
                            <Link to="/quienes-somos">Conócenos</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* MAPA */}
            <section className="container mx-auto px-4 lg:px-8 -mt-10 relative z-10">
                <BranchesMap branches={Branches} />
            </section>

            {/* LISTA DE SUCURSALES */}
            <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Nuestras sucursales</h2>
                <p className="mt-1 text-muted-foreground">
                    Elige tu punto de atención ideal o cotiza directo por WhatsApp.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Branches.map((branch) => (
                        <BranchCard key={branch.id} branch={branch} />
                    ))}
                </div>

                <div className="mt-8 text-xs text-muted-foreground">
                    * Horarios y disponibilidad pueden variar por zona. Confirma por WhatsApp antes de visitar.
                </div>
            </section>
        </main>
    )
}
