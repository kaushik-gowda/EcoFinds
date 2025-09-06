import CheckoutForm from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center font-headline">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
