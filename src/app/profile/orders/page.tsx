
"use client";

import { useAuth } from "@/context/auth-context";
import { getOrdersForUser } from "@/lib/data";
import { Order } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }
    
    async function fetchOrders() {
      setLoading(true);
      try {
        const userOrders = await getOrdersForUser(user.uid);
        setOrders(userOrders);
      } catch (error) {
        // It's better to show an error to the user.
        // For now, we'll log it.
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();

  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <Skeleton className="h-10 w-1/3" />
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/5" />
                </div>
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Purchase History</h1>
      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map(order => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl">Order #{order.id.split('-')[1]}</CardTitle>
                    <CardDescription>
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-lg font-semibold text-right">
                    Total: ₹{order.total.toFixed(2)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {order.items.map(item => (
                    <li key={item.id} className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold">You haven't purchased anything yet.</h2>
            <p className="text-muted-foreground mt-2 mb-6">Your past orders will appear here.</p>
            <Button asChild>
                <Link href="/">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
