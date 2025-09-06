
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Save, Upload } from "lucide-react";
import { useState, useRef } from "react";

const formSchema = z.object({
  displayName: z.string().min(3, "Username must be at least 3 characters long."),
  phoneNumber: z.string().optional(),
  photoFile: z.any().optional(),
});

export default function ProfileForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const auth = getAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      photoFile: null,
    },
  });

  const photoFileValue = form.watch("photoFile");
  const displayNameValue = form.watch("displayName");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("photoFile", file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth.currentUser) {
      toast({ variant: "destructive", title: "Not authenticated" });
      return;
    }
    setIsSubmitting(true);
    try {
      let finalPhotoURL = user?.photoURL ?? "";
      
      // If a new file was selected, use a placeholder URL.
      // In a real app, you would upload the file to a service like Firebase Storage here
      // and get the actual URL.
      if (values.photoFile) {
        finalPhotoURL = `https://picsum.photos/200/200?random=${Math.random()}`;
      }

      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
        photoURL: finalPhotoURL,
        // phoneNumber is not a direct property of updateProfile, it is managed separately
      });

      // In a real app, you would also save the phone number to your user profile in Firestore.
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Clear the preview and file input after successful submission
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      form.reset({
        ...values,
        photoFile: null
      });

      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const getFallbackInitial = () => {
    if (displayNameValue && displayNameValue.length > 0) {
      return displayNameValue[0].toUpperCase();
    }
    if (user?.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    return "A";
  }
  
  const currentAvatarSrc = previewImage || user?.photoURL;

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="items-center text-center">
             <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group"
            >
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={currentAvatarSrc ?? ""} alt={displayNameValue ?? "User"} />
                <AvatarFallback className="text-4xl">{getFallbackInitial()}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 h-24 w-24 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </button>
            <CardTitle className="text-2xl font-bold font-headline">{displayNameValue || user?.displayName}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pt-6">
             <FormField
              control={form.control}
              name="photoFile"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" value={user?.email ?? ""} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="px-6 pb-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
