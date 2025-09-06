"use client";

import SellForm from "@/components/sell/sell-form";
import { getProduct } from "@/lib/data";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditListingPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait until auth is no longer loading
    if (authLoading) return;

    // If no user, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // Now that we know we have an authenticated user, fetch the product.
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProduct(params.id);
        if (fetchedProduct) {
          if (fetchedProduct.userId !== user.uid) {
            setError("You are not authorized to edit this listing.");
          } else {
            setProduct(fetchedProduct);
          }
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();

  }, [params.id, user, authLoading, router]);

  if (loading || authLoading) {
    return (
       <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
             <Skeleton className="h-32 w-full" />
             <Skeleton className="h-12 w-full" />
        </div>
       </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-destructive">{error}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
           <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Your Listing</h1>
        </div>
        {product && <SellForm product={product} />}
      </div>
    </div>
  );
}
