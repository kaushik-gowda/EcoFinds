
"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity)) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-md overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, 112px"
          />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 items-center">
          <div className="md:col-span-3">
            <Link href={`/products/${item.id}`} className="font-semibold text-base sm:text-lg hover:underline leading-tight">
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">₹{item.price.toFixed(2)} each</p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor={`quantity-${item.id}`} className="text-sm text-muted-foreground">Qty:</label>
            <Input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-20 h-10"
              aria-label={`Quantity for ${item.name}`}
            />
          </div>
           <p className="font-semibold text-base sm:text-lg text-right md:col-start-3">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleRemove} className="ml-auto self-start text-muted-foreground hover:text-destructive">
          <X className="h-5 w-5" />
          <span className="sr-only">Remove {item.name}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
