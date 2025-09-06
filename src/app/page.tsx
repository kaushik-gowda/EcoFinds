
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, ArrowDown, Leaf, ShoppingCart, Users } from 'lucide-react';
import Image from 'next/image';
import CategoryShowcase from '@/components/home/category-showcase';

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Abstract background image"
          fill
          className="object-cover -z-10 brightness-50"
          priority
          data-ai-hint="abstract background"
        />
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 font-headline leading-tight">
            Explore Our Collection
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Discover unique and sustainable products from independent sellers, curated just for you.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              Shop Now <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <CategoryShowcase />

      <section id="about" className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight font-headline">About EcoFinds</h2>
              <p className="text-muted-foreground text-lg">
                At EcoFinds, we're more than just a marketplace; we're a community built on the principle of conscious consumerism. Our mission is to connect thoughtful buyers with independent sellers who are passionate about creating sustainable, eco-friendly, and ethically-made products.
              </p>
              <p className="text-muted-foreground">
                Every item on our platform is carefully selected to ensure it meets our high standards for quality and environmental responsibility. We believe that every purchase can be a statement of your values, and we're here to make that choice easier and more inspiring. Join us in making a positive impact, one unique find at a time.
              </p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
                    <Leaf className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Sustainable Products</h4>
                      <p className="text-sm text-muted-foreground">Eco-friendly and ethically sourced.</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Support Artisans</h4>
                      <p className="text-sm text-muted-foreground">Empowering independent creators.</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="https://picsum.photos/600/600?random=100"
                    alt="Artisan crafting a product"
                    fill
                    className="object-cover"
                    data-ai-hint="artisan craft"
                />
            </div>
          </div>
        </div>
      </section>
      
      <Button asChild className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg" size="icon">
        <Link href="/sell">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Add new listing</span>
        </Link>
      </Button>
    </>
  );
}
