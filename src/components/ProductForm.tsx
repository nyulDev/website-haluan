"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/app/actions/product";
import { ImagePlus, X, ChevronDown } from "lucide-react";

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
  category?: { name: string };
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const [isPending, setIsPending] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(product?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState<string>(
    product?.category?.name || categories.find(c => c.id === product?.categoryId)?.name || ""
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(categoryInput.toLowerCase())
  );

  const isEditing = !!product;
  const action = isEditing ? updateProduct.bind(null, product.id) : createProduct;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        return;
      }

      setImageUrl(data.url);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

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
        <Label htmlFor="categoryName">Category</Label>
        <div className="relative">
          <Input
            ref={categoryInputRef}
            id="categoryName"
            name="categoryName"
            value={categoryInput}
            onChange={(e) => {
              setCategoryInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Ketik nama kategori baru atau pilih yang ada"
            required
            autoComplete="off"
            className="pr-8"
          />
          <ChevronDown
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          />
          {showSuggestions && (categoryInput === "" ? categories : filteredCategories).length > 0 && (
            <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {(categoryInput === "" ? categories : filteredCategories).map((c) => (
                <li
                  key={c.id}
                  onMouseDown={() => {
                    setCategoryInput(c.name);
                    setShowSuggestions(false);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Pilih kategori yang ada atau ketik nama baru untuk membuat kategori baru.
        </p>
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

      {/* Hidden input carries the final image path to the server action */}
      <input type="hidden" name="image" value={imageUrl} />

      <div className="space-y-2">
        <Label>Image</Label>

        {imageUrl ? (
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="Product preview"
              className="w-40 h-40 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5 shadow hover:bg-red-50 hover:border-red-300 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-slate-300 rounded-md cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors"
          >
            <ImagePlus className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-xs text-slate-500 text-center px-2">
              {isUploading ? "Uploading..." : "Click to upload"}
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />

        {!imageUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Choose Image"}
          </Button>
        )}

        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}

        <p className="text-xs text-slate-500">
          JPEG, PNG, WebP or GIF — max 5MB
        </p>
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
        <Button type="submit" disabled={isPending || isUploading}>
          {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
