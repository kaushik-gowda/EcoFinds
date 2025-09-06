
import { Suspense } from 'react';
import ProductGrid from '@/components/product/product-grid';
import ProductSearch from '@/components/product/product-search';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = ''; // No category for the main products page

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2 font-headline">Discover Our Products</h2>
      <p className="text-muted-foreground text-center mb-8">Find what you're looking for, or browse by category.</p>

      <div className="mb-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductSearch />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid query={query} category={category} />
      </Suspense>
    </div>
  );
}
