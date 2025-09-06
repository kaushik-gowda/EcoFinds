"use client";

import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddToCartFormProps {
    product: Product;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
    const { dispatch } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: { ...product, image: product.images[0], quantity: 1 } });
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
        </div>
    );
}
