"use client";

import { useCart } from "@/context/cart-context";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function CartContents() {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <Card className="text-center p-8 md:p-16">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
      <div className="lg:col-span-2 space-y-4">
        {state.items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
}
