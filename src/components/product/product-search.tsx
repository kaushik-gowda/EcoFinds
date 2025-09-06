
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/data';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProductSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState<string[]>([]);
  
  const currentCategory = decodeURIComponent(pathname.split('/')[2] || 'All');

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(['All', ...fetchedCategories]);
    }
    fetchCategories();
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    const categoryPath = currentCategory === 'All' ? '/products' : `/categories/${encodeURIComponent(currentCategory)}`;
    router.replace(`${categoryPath}?${params.toString()}`);
  }, 300);


  return (
    <div className="space-y-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for items..."
          className="w-full pl-10"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(category => {
            const href = category === 'All' ? '/products' : `/categories/${encodeURIComponent(category)}`;
            return (
                 <Button 
                    key={category}
                    variant={currentCategory === category ? "default" : "outline"}
                    size="sm"
                    asChild
                    className="rounded-full"
                >
                  <Link href={href}>{category}</Link>
                </Button>
            )
        })}
      </div>
    </div>
  );
}
