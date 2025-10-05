import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, Factory, Leaf, Package, ShieldCheck, Truck, Users } from "lucide-react"
import { Link } from "react-router"

const bullets = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, title: "Calidad consistente", desc: "Prendas base de marcas líderes para decorar y uso rudo." },
    { icon: <Truck className="h-5 w-5 text-primary" />, title: "Cobertura nacional", desc: "Logística optimizada con tiempos de entrega competitivos." },
    { icon: <Factory className="h-5 w-5 text-primary" />, title: "Capacidad de volumen", desc: "Procesos listos para mayoreo y reposiciones continuas." },
    { icon: <Leaf className="h-5 w-5 text-primary" />, title: "Enfoque responsable", desc: "Selección de proveedores con prácticas y reportes ESG." },
]

const steps = [
    { title: "1) Asesoría y selección", desc: "Elegimos la prenda ideal por uso, gramaje, fit y presupuesto." },
    { title: "2) Cotización clara", desc: "Desglosamos costos, tiempos de producción y opciones de entrega." },
    { title: "3) Producción y control", desc: "Manejo de calidad en tallas, colorimetría y acabado." },
    { title: "4) Entrega y reposición", desc: "Despacho ágil y soporte para reabastecimiento." },
]

const faqs = [
    {
        q: "¿Qué marcas manejan?",
        a: "Trabajamos con marcas de alta rotación y calidad constante, como Yazbek/Yasbek, Bones Fit y Gildan, entre otras. Esto nos permite asegurar tallajes confiables y una base óptima para diversas técnicas de impresión."
    },
    {
        q: "¿Pueden imprimir o bordar?",
        a: "Sí, te asesoramos sobre la técnica adecuada (serigrafía plastisol o base agua, DTF, bordado) según el arte, el uso de la prenda y el acabado deseado."
    },
    {
        q: "¿Cuál es el pedido mínimo?",
        a: "Para mayoreo, trabajamos a partir de 50 piezas en la mayoría de líneas. Para proyectos especiales podemos revisar mínimos distintos."
    },
    {
        q: "¿Cuál es el tiempo de entrega?",
        a: "Depende del volumen y la técnica. Para básicos sin aplicación, los tiempos son muy ágiles; con personalización, te confirmamos cronograma al cotizar."
    },
    {
        q: "¿Envían a todo México?",
        a: "Sí. Coordinamos paqueterías con cobertura nacional y te compartimos guía de rastreo y recomendaciones de recepción."
    },
]

export const InfoPage = () => {
    return (
        <main className="min-h-screen">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/Banner1.jpg" alt="Taller y logística textil" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28">
                    <Badge className="bg-secondary text-secondary-foreground mb-4">Quiénes somos</Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight">
                        Tu aliado en mayoreo para prendas de alta rotación
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl">
                        Acompañamos a marcas, equipos y negocios a escalar con básicos confiables, tiempos ágiles y precios competitivos.
                    </p>
                    <div className="mt-6 flex gap-3">
                        {/* <Button className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground">
                            <Link to="/productos">Ver productos</Link>
                        </Button> */}
                        <Button className="text-primary-foreground text-lg !px-8 !py-6">
                            <Link to="/sucursales">Ver sucursales</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Misión Visión Valores */}
            <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="text-xl font-semibold">Misión</h3>
                        <p className="mt-2 text-muted-foreground">
                            Suministrar básicos textiles para mayoreo con calidad consistente, asesoría honesta y tiempos competitivos, impulsando el crecimiento de nuestros clientes.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="text-xl font-semibold">Visión</h3>
                        <p className="mt-2 text-muted-foreground">
                            Ser la opción preferida en México para abastecer y personalizar prendas base, integrando mejores prácticas de operación y sostenibilidad.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="text-xl font-semibold">Valores</h3>
                        <ul className="mt-2 space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Calidad y consistencia</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Transparencia y cumplimiento</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Servicio y cercanía</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Cifras + Aliados */}
            <section className="container mx-auto px-4 lg:px-8 pb-6 md:pb-10">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
                        <Package className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">500+</p>
                            <p className="text-sm text-muted-foreground">Pedidos mensuales</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">200+</p>
                            <p className="text-sm text-muted-foreground">Clientes activos</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">Marcas líderes</p>
                            <p className="text-sm text-muted-foreground">Yazbek, Bones Fit, Gildan y más</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Propuesta de valor */}
            <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Por qué trabajar con nosotros</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {bullets.map((b) => (
                        <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                            <div className="flex items-center gap-3">
                                {b.icon}
                                <p className="font-semibold">{b.title}</p>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Capacidades */}
            <section className="container mx-auto px-4 lg:px-8 pb-12 md:pb-16">
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Capacidades y acabados</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Prendas base</h3>
                            <p className="text-sm text-muted-foreground">
                                T-shirts (algodón/mezclas), polos, sudaderas y prendas para personalización. Tallas consistentes y stock de alta rotación.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Personalización</h3>
                            <p className="text-sm text-muted-foreground">
                                Serigrafía (plastisol / base agua), DTF, bordado. Te asesoramos para lograr el tacto y la durabilidad adecuados según el uso.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                        * Algunas marcas fabricantes no ofrecen directamente servicios de aplicación; nosotros integramos talleres y control de calidad para entregarte el proyecto completo.
                    </div>
                </div>
            </section>

            {/* Proceso */}
            <section className="container mx-auto px-4 lg:px-8 pb-12 md:pb-16">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Cómo trabajamos</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((s) => (
                        <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                            <p className="font-semibold">{s.title}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                        </div>
                    ))}
                </div>
                {/* <div className="mt-6 flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                        <Link to="/productos">Explorar productos</Link>
                    </Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground" onClick={openWhatsApp}>
                        Cotizar proyecto
                    </Button>
                </div> */}
            </section>

            {/* ESG / Responsabilidad breve */}
            <section className="container mx-auto px-4 lg:px-8 pb-12 md:pb-16">
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Compromiso responsable</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Seleccionamos proveedores que publican avances y prácticas de sustentabilidad en su cadena de valor. Nuestro objetivo es impulsar opciones responsables sin comprometer la calidad ni la disponibilidad.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Gestión de agua y energía</Badge>
                        <Badge variant="secondary">Materiales y trazabilidad</Badge>
                        <Badge variant="secondary">Condiciones laborales</Badge>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                        Consulta en la ficha de producto la composición, gramaje y recomendaciones de aplicación para maximizar el desempeño.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="container mx-auto px-4 lg:px-8 pb-20">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Preguntas frecuentes</h2>
                <Accordion type="single" collapsible className="mt-4">
                    {faqs.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    )
}
