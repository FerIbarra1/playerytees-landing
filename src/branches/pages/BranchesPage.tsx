import { useMemo } from "react"
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, Store, Clock, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { Link } from "react-router"

import "leaflet/dist/leaflet.css";

interface Branch {
    id: string
    name: string
    address: string
    phone?: string
    whatsapp?: string
    email?: string
    mapUrl?: string
    coords?: { lat: number; lng: number }
    status?: "open" | "coming-soon"
}

const BRANCHES: Branch[] = [
    {
        id: "lpz",
        name: "Playerytees La Paz",
        address:
            "Lic. Primo Verdad #2045, entre Ignacio Allende y Antonio Rosales. Col. Zona Comercial, La Paz, BCS",
        phone: "612 124 533",
        whatsapp: "612 200 3331",
        email: undefined,
        mapUrl:
            "https://www.google.com/maps/place/Playerytees+La+Paz/@24.1507002,-110.3106409,20z",
        coords: { lat: 24.1507002, lng: -110.3106409 },
        status: "open",
    },
    {
        id: "obg",
        name: "Playerytees Obregón",
        address:
            "Nicolás Bravo 700 B, Centro, Urb. No. 1, 85000 Cd. Obregón, Sonora",
        phone: "644 414 2974",
        whatsapp: "644 140 5742",
        email: "psventasobregon@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/place/Playerytees/@27.4869856,-109.9334932,21z",
        coords: { lat: 27.4869856, lng: -109.9334932 },
        status: "open",
    },
    {
        id: "hmo",
        name: "Playerytees Hermosillo",
        address: "Heriberto Aja 13, Centro, 83000 Hermosillo, Sonora",
        phone: undefined,
        whatsapp: "642 156 4947",
        email: "psventashermosillo@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/search/Calle%20Heriberto%20Aja%2027/@29.0838031768799,-110.94994354248,17z",
        coords: { lat: 29.0838032, lng: -110.9499435 },
        status: "open",
    },
    {
        id: "mxl",
        name: "Playerytees Mexicali",
        address:
            "Blvd. Lázaro Cárdenas #481, Col. Ex Ejido Coahuila, C.P. 21360, Mexicali, BC",
        phone: "(686) 523 7110",
        whatsapp: "(686) 100 5501",
        email: "psventasmexicali@hotmail.com",
        mapUrl:
            "https://www.google.com/maps/place/PLAYERYTEES/@32.6250483,-115.4413479,21z",
        coords: { lat: 32.6250483, lng: -115.4413479 },
        status: "open",
    },
    {
        id: "nog",
        name: "Playerytees Nogales",
        address:
            "Av. Tecnológico 550 Local 7, Col. Granja, Nogales, Sonora, C.P. 84065",
        phone: "631 319 2040",
        whatsapp: "631 125 6254",
        email: undefined,
        mapUrl: undefined, // aún sin ubicación exacta
        coords: undefined, // cuando la tengas, colócala aquí
        status: "coming-soon",
    },
]

// ====================== ICONOS MAPA ======================
const emeraldMarker = new L.DivIcon({
    className: "",
    html: `
    <div style="
      width:18px;height:18px;border-radius:9999px;
      background:#10b981;border:2px solid white;
      box-shadow:0 6px 14px rgba(16,185,129,.35);
    "></div>
  `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
})

// ====================== COMPONENTES ======================
function openWhatsApp(number: string, preset?: string) {
    const intl = number.replace(/\D/g, "")
    const text = encodeURIComponent(
        preset ||
        "Hola, me gustaría solicitar una cotización y conocer disponibilidad. ¡Gracias!"
    )
    window.open(`https://wa.me/52${intl}?text=${text}`, "_blank", "noopener,noreferrer")
}

function BranchCard({ b }: { b: Branch }) {
    // const hasContact = b.phone || b.whatsapp || b.email
    return (
        <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{b.name}</h3>
                        {b.status === "coming-soon" && (
                            <Badge variant="secondary" className="ml-1">
                                Próximamente
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground flex gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{b.address}</span>
                    </p>
                </div>
                {b.status === "coming-soon" ? (
                    <Construction className="h-5 w-5 text-muted-foreground" />
                ) : null}
            </div>

            <Separator className="my-4" />

            <div className="grid gap-2 text-sm">
                {b.phone && (
                    <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                            {b.phone}
                        </a>
                    </p>
                )}
                {b.whatsapp && (
                    <p className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <button
                            className="text-left hover:text-primary underline-offset-2 hover:underline"
                            onClick={() =>
                                openWhatsApp(
                                    b.whatsapp!,
                                    `Hola ${b.name}, me gustaría solicitar una cotización.\n\n• Producto/Modelo:\n• Tallas/Colores:\n• Cantidad aprox:\n\n¿Podrían apoyarme con disponibilidad, tiempos y costo total?`
                                )
                            }
                        >
                            WhatsApp: {b.whatsapp}
                        </button>
                    </p>
                )}
                {b.email && (
                    <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${b.email}`} className="hover:text-primary">
                            {b.email}
                        </a>
                    </p>
                )}
                <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Lun–Vie 9:00–18:00 • Sáb 10:00–14:00</span>
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {b.mapUrl && (
                    <Button variant="outline" asChild>
                        <a href={b.mapUrl} target="_blank" rel="noopener noreferrer">
                            Cómo llegar <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                )}
                {b.whatsapp && (
                    <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground"
                        onClick={() =>
                            openWhatsApp(
                                b.whatsapp!,
                                `Hola ${b.name}, me gustaría realizar un pedido de mayoreo. ¿Podemos cotizar?`
                            )
                        }
                    >
                        Cotizar por WhatsApp
                    </Button>
                )}
            </div>
        </div>
    )
}

function BranchesMap() {
    const points = BRANCHES.filter((b) => b.coords).map((b) => b.coords!) // solo abiertas
    const center = useMemo(() => {
        if (!points.length) return { lat: 23.6345, lng: -102.5528 } // centro MX
        // promedio simple
        const lat = points.reduce((s, p) => s + p.lat, 0) / points.length
        const lng = points.reduce((s, p) => s + p.lng, 0) / points.length
        return { lat, lng }
    }, [points])

    return (
        <div className="rounded-2xl overflow-hidden border border-border">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={5}
                className="h-[600px] w-full"
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    detectRetina
                />
                {BRANCHES.filter((b) => b.coords && b.status !== "coming-soon").map((b) => (
                    <Marker
                        key={b.id}
                        position={[b.coords!.lat, b.coords!.lng]}
                        icon={emeraldMarker}
                    >
                        <Popup>
                            <div className="space-y-1">
                                <p className="font-semibold">{b.name}</p>
                                <p className="text-xs text-muted-foreground">{b.address}</p>
                                <div className="mt-2 flex gap-2">
                                    {b.mapUrl && (
                                        <a
                                            href={b.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary underline inline-flex items-center gap-1"
                                        >
                                            Cómo llegar <ArrowUpRight className="h-3 w-3" />
                                        </a>
                                    )}
                                    {b.whatsapp && (
                                        <button
                                            className="text-xs text-emerald-600 underline"
                                            onClick={() => openWhatsApp(b.whatsapp!)}
                                        >
                                            WhatsApp
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export const BranchesPage = () => {
    return (
        <main className="min-h-screen">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/Banner4.jpg" alt="Mapa y sucursales" className="w-full h-full object-cover" />
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
                <BranchesMap />
            </section>

            {/* LISTA DE SUCURSALES */}
            <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Nuestras sucursales</h2>
                <p className="mt-1 text-muted-foreground">
                    Elige tu punto de atención ideal o cotiza directo por WhatsApp.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BRANCHES.map((b) => (
                        <BranchCard key={b.id} b={b} />
                    ))}
                </div>

                <div className="mt-8 text-xs text-muted-foreground">
                    * Horarios y disponibilidad pueden variar por zona. Confirma por WhatsApp antes de visitar.
                </div>
            </section>
        </main>
    )
}
