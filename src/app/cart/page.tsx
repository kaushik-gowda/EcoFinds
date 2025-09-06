import CartContents from "@/components/cart/cart-contents";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline text-center">Your Shopping Cart</h1>
      <CartContents />
    </div>
  );
}
