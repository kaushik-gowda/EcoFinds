
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function CategoriesPage() {
  const categories = [
    "Apparel",
    "Electronics",
    "Home Goods",
    "Accessories",
    "Lifestyle",
    "Beauty",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Handmade",
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-2 font-headline">All Categories</h2>
      <p className="text-muted-foreground text-center mb-8">Explore our wide range of product categories.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link key={category} href={`/categories/${encodeURIComponent(category)}`} className="block group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-square relative">
                <Image
                  src={`https://picsum.photos/400/400?random=${index + 30}`}
                  alt={category}
                  width={400}
                  height={400}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  data-ai-hint={`${category} products`}
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
              <div className="p-4 bg-background">
                <h3 className="font-semibold text-lg text-center text-foreground">{category}</h3>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
