
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default async function CategoryShowcase() {
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
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Shop by Category</h2>
            <Link href="/categories" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category} href={`/categories/${encodeURIComponent(category)}`} className="block">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center p-4 min-h-[100px]">
                    <CardTitle className="text-lg font-medium text-center">{category}</CardTitle>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
