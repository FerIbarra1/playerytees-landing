import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from "swiper/modules"
import { Package, Truck, Tag, Users } from "lucide-react"

type Slide = {
    id: string
    image: string
    alt?: string
    href?: string
    title: string
    subtitle: string
    badge?: string
    ctaText?: string
    icon?: "package" | "truck" | "tag" | "users"
    stats?: { value: string; label: string }[]
}

interface SliderBannerProps {
    slides?: Slide[]
    className?: string
}

const slidesMock: Slide[] = [
    {
        id: "1",
        image: "/banners/Banner1.jpg",
        alt: "Descuentos por volumen",
        badge: "Oferta Especial",
        title: "Hasta 40% de descuento en pedidos mayoristas",
        subtitle: "Compra desde 100 piezas y obtén los mejores precios del mercado",
        ctaText: "Ver Catálogo Completo",
        href: "/productos",
        icon: "tag",
        stats: [
            { value: "40%", label: "Descuento" },
            { value: "100+", label: "Piezas mínimas" },
        ],
    },
    {
        id: "2",
        image: "/banners/Banner2.jpg",
        alt: "Envío gratis",
        badge: "Envío Express",
        title: "Envío gratis en pedidos mayores a $5,000",
        subtitle: "Entrega en 24-48 horas a toda la República Mexicana",
        ctaText: "Solicitar Cotización",
        href: "/cotizacion",
        icon: "truck",
        stats: [
            { value: "24-48h", label: "Entrega" },
            { value: "Gratis", label: "Envío" },
        ],
    },
    // {
    //     id: "3",
    //     image: "/Portada1.jpg",
    //     alt: "Personalización incluida",
    //     badge: "Servicio Premium",
    //     title: "Personalización y bordado sin costo extra",
    //     subtitle: "Logo de tu empresa o equipo incluido en pedidos de 200+ piezas",
    //     ctaText: "Conocer Más",
    //     href: "/personalizacion",
    //     icon: "package",
    //     stats: [
    //         { value: "200+", label: "Piezas" },
    //         { value: "Gratis", label: "Bordado" },
    //     ],
    // },
    {
        id: "4",
        image: "/banners/Banner3.jpg",
        alt: "Clientes satisfechos",
        badge: "Confianza Garantizada",
        title: "Más de 500 empresas confían en nosotros",
        subtitle: "Calidad premium, atención personalizada y los mejores precios",
        ctaText: "Ver Testimonios",
        href: "/testimonios",
        icon: "users",
        stats: [
            { value: "500+", label: "Clientes" },
            { value: "5★", label: "Calificación" },
        ],
    },
]

const iconMap = {
    package: Package,
    truck: Truck,
    tag: Tag,
    users: Users,
}

export const SliderBanner = ({ slides = slidesMock, className = "" }: SliderBannerProps) => {
    return (
        <div className={`py-12 lg:py-16 ${className}`}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
                effect="fade"
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/60",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-8",
                }}
                a11y={{ enabled: true }}
                breakpoints={{
                    0: { allowTouchMove: true },
                    768: { allowTouchMove: true },
                }}
                className="rounded-3xl shadow-2xl overflow-hidden group"
            >
                {slides.map((slide) => {
                    const Icon = slide.icon ? iconMap[slide.icon] : Package
                    return (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden">
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0">
                                    <img
                                        src={slide.image || "/placeholder.svg"}
                                        alt={slide.alt || slide.title}
                                        className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* Gradient Overlay - más oscuro para mejor legibilidad */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="h-full flex flex-col justify-center max-w-2xl">
                                        {/* Badge */}
                                        {slide.badge && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 backdrop-blur-sm rounded-full text-secondary font-semibold text-sm mb-4 w-fit animate-slide-in-left">
                                                <Icon className="h-4 w-4" />
                                                <span>{slide.badge}</span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 text-balance animate-slide-in-left drop-shadow-2xl">
                                            {slide.title}
                                        </h2>

                                        {/* Subtitle */}
                                        <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed mb-6 text-pretty max-w-xl animate-slide-in-left drop-shadow-lg">
                                            {slide.subtitle}
                                        </p>

                                        {/* Stats */}
                                        {slide.stats && slide.stats.length > 0 && (
                                            <div className="flex gap-6 mb-8 animate-slide-in-left">
                                                {slide.stats.map((stat, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20"
                                                    >
                                                        <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                                                        <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* CTA Button */}
                                        {/* <div className="animate-slide-in-left">
                                            <Button
                                                size="lg"
                                                className="bg-secondary hover:bg-secondary/90 text-white text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                                asChild
                                            >
                                                <a href={slide.href || "#"}>
                                                    {slide.ctaText || "Ver Más"}
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </a>
                                            </Button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
