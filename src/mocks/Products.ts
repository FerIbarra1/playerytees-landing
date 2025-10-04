export interface Product {
    id: string
    title: string
    image: string
    price: number
    oldPrice?: number
    rating?: number
    colors?: string[]
    inStock?: boolean
    tag?: "Nuevo" | "Oferta" | "Top"
}

export const ProductsMock: Product[] = [
    {
        id: "tee-oversize-negro",
        title: "Playera Oversize Premium - Negro",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 129.0,
        oldPrice: 159.0,
        rating: 4.8,
        colors: ["#111111", "#FFFFFF", "#757575"],
        inStock: true,
        tag: "Top",
    },
    {
        id: "tee-dryfit-blanco",
        title: "T-Shirt Dry-Fit - Blanco",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 119.0,
        rating: 4.6,
        colors: ["#FFFFFF", "#1e3a8a"],
        inStock: true,
        tag: "Nuevo",
    },
    {
        id: "polo-classic-azul",
        title: "Polo Classic - Azul Marino",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 179.0,
        oldPrice: 199.0,
        rating: 4.5,
        colors: ["#0b1f3a", "#f1f5f9"],
        inStock: true,
        tag: "Oferta",
    },
    {
        id: "sudadera-basic-gris",
        title: "Sudadera Basic - Gris Jaspe",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 279.0,
        rating: 4.7,
        colors: ["#4b5563", "#111827"],
        inStock: true,
    },
    {
        id: "pants-jogger-negro",
        title: "Pants Jogger - Negro",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 249.0,
        rating: 4.4,
        colors: ["#111111", "#6b7280"],
        inStock: true,
    },
    {
        id: "tee-cuello-v-blanco",
        title: "Playera Cuello V - Blanco",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 109.0,
        rating: 4.2,
        colors: ["#FFFFFF", "#111111"],
        inStock: true,
    },
    {
        id: "chaleco-light-azul",
        title: "Chaleco Light - Azul",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 329.0,
        rating: 4.3,
        colors: ["#1e40af", "#111827"],
        inStock: true,
    },
    {
        id: "camisa-oxford-gris",
        title: "Camisa Oxford - Gris",
        image: "/products/PLAYERA-HOMBRE-1.webp",
        price: 299.0,
        rating: 4.6,
        colors: ["#6b7280", "#111111"],
        inStock: true,
    },
]
