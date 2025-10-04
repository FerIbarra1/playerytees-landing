import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Product } from "@/mocks/Products"

export function ProductCard({ product }: { product: Product }) {
    const { title, image, rating, colors = [], inStock = true, tag } = product

    return (
        <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative aspect-[3/3] bg-muted">
                {tag && (
                    <Badge className="absolute left-3 top-3 z-10 bg-primary text-primary-foreground shadow">
                        {tag}
                    </Badge>
                )}

                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>

            <div className="p-4 sm:p-5">
                <h3 className="line-clamp-2 font-semibold text-foreground">{title}</h3>

                {/* Rating */}
                {typeof rating === "number" && (
                    <div className="mt-1 flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
                    </div>
                )}

                {/* Colors */}
                {colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                        {colors.slice(0, 5).map((c, i) => (
                            <span
                                key={`${c}-${i}`}
                                className="h-4 w-4 rounded-full border border-border"
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                        {colors.length > 5 && <span className="text-xs text-muted-foreground">+{colors.length - 5}</span>}
                    </div>
                )}

                {/* Price */}
                {/* <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">{currency(price)}</span>
                    {oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{currency(oldPrice)}</span>
                    )}
                </div> */}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        Ver detalles
                    </Button>
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-primary-foreground hover:brightness-110">
                        Agregar al carrito
                    </Button>
                </div>

                {!inStock && (
                    <p className="mt-2 text-xs text-destructive">Temporalmente sin stock</p>
                )}
            </div>
        </div>
    )
}
