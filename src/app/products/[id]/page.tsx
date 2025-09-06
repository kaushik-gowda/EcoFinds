
import { getProduct } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star } from 'lucide-react';
import ProductImages from '@/components/product/product-images';
import AddToCartForm from '@/components/product/add-to-cart-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-6">
        <Button asChild variant="ghost" className="pl-1">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductImages images={product.images} alt={product.name} />

        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
            <h1 className="text-4xl font-bold tracking-tight font-headline">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">₹{product.price.toFixed(2)}</p>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">({product.reviews.length} reviews)</span>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground">{product.longDescription}</p>

          <AddToCartForm product={product} />

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <h3 className="font-semibold text-foreground">Details</h3>
            <ul>
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map(review => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">{review.author}</CardTitle>
                      <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">This product has no reviews yet.</p>
        )}
      </div>
    </div>
  );
}
