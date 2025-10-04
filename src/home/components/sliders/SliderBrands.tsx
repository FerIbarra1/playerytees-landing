
interface Brand {
    name: string
    logo: string
    href?: string
}

interface SliderBrandsProps {
    brands: Brand[]
}

export const SliderBrands = ({ brands }: SliderBrandsProps) => {
    const loop = [...brands, ...brands]

    return (
        <div className="flex flex-col items-center py-6">
            <div className="text-center max-w-3xl px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                    Marcas con las que trabajamos
                </h2>
                <p className="mt-3 text-base sm:text-lg text-muted-foreground">
                    Aliados oficiales como <span className="font-semibold">Yasbek</span>,{" "}
                    <span className="font-semibold">BonesFit</span>,{" "}
                    <span className="font-semibold">Gildan</span> y más. Seleccionamos marcas líderes
                    para asegurar calidad consistente, tallas confiables y disponibilidad a nivel nacional.
                </p>
            </div>
            <div
                className={`brands-marquee relative w-full py-6 sm:py-10`}
                style={{ ["--marquee-duration" as string]: "25s" }}
                aria-label="Marcas con las que trabajamos"
            >
                <div className="brands-track">
                    {loop.map((b, idx) => (
                        <div
                            key={`${b.name}-${idx}`}
                            className="flex items-center justify-center h-20 sm:h-30 min-w-[140px] sm:min-w-[180px] px-4 py-2 rounded-xl bg-card border border-border shadow-sm"
                        >
                            <img
                                src={b.logo}
                                alt={b.name}
                                className="max-h-14 sm:max-h-18 w-auto object-contain opacity-90"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
