"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProduct, updateProduct } from "@/app/actions/product";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  categoryId: string;
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const [isPending, setIsPending] = useState(false);

  const isEditing = !!product;
  const action = isEditing ? updateProduct.bind(null, product.id) : createProduct;

  return (
    <form
      action={async (formData) => {
        setIsPending(true);
        await action(formData);
        setIsPending(false);
      }}
      className="space-y-6 bg-white p-6 rounded-md border max-w-2xl"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          defaultValue={product?.title || ""} 
          required 
          placeholder="e.g. BOATSWAIN'S CHAIR"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId" defaultValue={product?.categoryId || categories[0]?.id}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={product?.description || ""} 
          placeholder="Optional product description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          name="image" 
          defaultValue={product?.image || ""} 
          placeholder="e.g. /impa/23/1.png"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => window.history.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
