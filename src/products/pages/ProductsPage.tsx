import { ProductsMock } from "@/mocks/Products"

export const ProductsPage = () => {
    return (
        <section className="relative pt-10 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {
                    ProductsMock.map((product) => (
                        <div key={product.id} className="mb-8 p-4 border border-border rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-2" />
                            <p className="text-sm text-muted-foreground mb-1">Rating: {product.rating}</p>
                            <p className="text-sm text-muted-foreground mb-1">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                            <p className="text-sm text-muted-foreground">Colors: {product.colors?.join(', ')}</p>
                        </div>
                    )
                    )
                }
            </div>
        </section>
    )
}
