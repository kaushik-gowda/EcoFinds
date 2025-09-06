import { getProducts } from "@/lib/data";
import ProductGrid from "./product-grid";

export default async function Recommendations() {
  const allProducts = await getProducts();
  // Simple logic to get a few "random" products.
  const recommendedProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 font-headline">You Might Also Like</h2>
      <p className="text-muted-foreground mb-6">AI-powered recommendations based on your interests.</p>
      <ProductGrid products={recommendedProducts} />
    </div>
  );
}
