
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { getProducts } from '@/lib/data';

interface ProductGridProps {
  query: string;
  category: string;
}

export default async function ProductGrid({ query, category }: ProductGridProps) {
  const allProducts = await getProducts();
  
  const filteredProducts = allProducts.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || 
                         product.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No products found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
