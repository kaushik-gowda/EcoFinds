
import { Leaf, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">EcoFinds</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover unique and sustainable products from independent sellers.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link></li>
                <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">Categories</Link></li>
                <li><Link href="/sell" className="text-sm text-muted-foreground hover:text-primary">Sell on EcoFinds</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
                <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2">
                <li><span className="text-sm text-muted-foreground">Email: support@ecofinds.com</span></li>
                <li><span className="text-sm text-muted-foreground">Phone: +91 1800 123 4567</span></li>
                <li><Link href="/#shipping" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                 <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} EcoFinds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
