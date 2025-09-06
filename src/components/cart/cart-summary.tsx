"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CartSummary() {
  const { state } = useCart();
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 4000 ? 0 : 40; // Free shipping over ₹4000
  const total = subtotal + shipping;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href="/checkout">
            Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
