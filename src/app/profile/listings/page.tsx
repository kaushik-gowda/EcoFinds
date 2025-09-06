"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProducts, deleteProduct } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


export default function MyListingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchListings() {
      try {
        const allProducts = await getProducts();
        const userListings = allProducts.filter(p => p.userId === user?.uid);
        setListings(userListings);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your listings.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
    
  }, [user, authLoading, router, toast]);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setListings(listings.filter(p => p.id !== productId));
      toast({
        title: "Success",
        description: "Your listing has been deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the listing.",
      });
    }
  };

  if (authLoading || loading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-48 w-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                            <CardFooter className="gap-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">My Listings</h1>
      {listings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map(product => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                 <Link href={`/products/${product.id}`} className="block">
                    <div className="aspect-square relative">
                        <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                 </Link>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                 <CardTitle className="text-lg font-semibold hover:underline">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                </CardTitle>
                <p className="text-2xl font-bold mt-1">₹{product.price.toFixed(2)}</p>
                <CardDescription className="mt-2 text-sm text-muted-foreground truncate">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href={`/profile/listings/edit/${product.id}`}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your listing.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(product.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold">You have no active listings.</h2>
            <p className="text-muted-foreground mt-2 mb-6">Why not sell something today?</p>
            <Button asChild>
                <Link href="/sell">List an Item</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
