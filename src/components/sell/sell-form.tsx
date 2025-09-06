
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { addProduct, updateProduct } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Product } from "@/lib/types";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3, "Product title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.string({ required_error: "Please select a category." }),
  imageFile: z.any().optional(),
});

interface SellFormProps {
  product?: Product;
}

// Helper to convert file to data URI
const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export default function SellForm({ product }: SellFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isEditing = !!product;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: undefined,
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      });
      if (product.images && product.images.length > 0) {
        setPreviewImage(product.images[0]);
      }
    }
  }, [product, form]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({ variant: "destructive", title: "Authentication required" });
      return;
    }
    setIsSubmitting(true);
    try {
      let imageUrl = product?.images[0] ?? `https://picsum.photos/600/600?random=${Math.random()}`;
      
      if (values.imageFile) {
        // In a real app, you would upload the file to a service like Firebase Storage here
        // and get the actual URL. For this demo, we'll convert it to a base64 data URI.
        imageUrl = await toBase64(values.imageFile);
      } else if (!isEditing) {
        // If creating a new product without an image, use a placeholder.
        // Or handle it as a validation error if an image is required.
      }


      if (isEditing && product) {
        await updateProduct(product.id, {
          name: values.name,
          description: values.description,
          longDescription: values.description, 
          price: values.price,
          category: values.category,
          images: [imageUrl],
        });
        toast({
          title: "Item Updated!",
          description: "Your item has been successfully updated.",
        });
        router.push("/profile/listings");
      } else {
        await addProduct({
          name: values.name,
          description: values.description,
          longDescription: values.description, 
          price: values.price,
          category: values.category,
          images: [imageUrl],
          stock: 1, // Default stock
          reviews: [],
          userId: user.uid,
        });
        toast({
          title: "Item Listed!",
          description: "Your item has been successfully listed for sale.",
        });
        router.push("/profile/listings");
      }
      router.refresh();
    } catch (error: any) {
      let description = `There was an error ${isEditing ? 'updating' : 'listing'} your item.`;
      if (error.message && /permission-denied/i.test(error.message)) {
          description = "Action failed due to database permissions. Please check your Firestore security rules to allow writes for authenticated users.";
      }
       toast({
        variant: "destructive",
        title: isEditing ? "Update Failed" : "Listing Failed",
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("imageFile", file);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Apparel">Apparel</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Home Goods">Home Goods</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                        <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Toys & Games">Toys & Games</SelectItem>
                        <SelectItem value="Handmade">Handmade</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your item in detail..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Enter amount in ₹" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageFile"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="sr-only" 
                        ref={fileInputRef} 
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      {!previewImage ? (
                        <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      ) : (
                        <div className="relative aspect-square w-full max-w-sm mx-auto border rounded-md overflow-hidden">
                           <Image src={previewImage} alt="Product image preview" fill className="object-cover" />
                           <Button 
                              type="button" 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 h-8 w-8"
                              onClick={() => {
                                setPreviewImage(null);
                                form.setValue("imageFile", null);
                                if(fileInputRef.current) fileInputRef.current.value = "";
                              }}
                           >
                            <X className="h-4 w-4" />
                           </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage>{form.formState.errors.imageFile?.message as string}</FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (isEditing ? 'Saving Changes...' : 'Submitting...') : (isEditing ? 'Save Changes' : 'Submit Listing')}
        </Button>
      </form>
    </Form>
  );
}
