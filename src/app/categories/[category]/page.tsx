
import { Suspense } from 'react';
import ProductGrid from '@/components/product/product-grid';
import ProductSearch from '@/components/product/product-search';
import { getCategories } from '@/lib/data';

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map(category => ({
        category: encodeURIComponent(category)
    }));
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = decodeURIComponent(params.category);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2 font-headline">{category}</h2>
      <p className="text-muted-foreground text-center mb-8">Browse all products in the {category.toLowerCase()} category.</p>

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
