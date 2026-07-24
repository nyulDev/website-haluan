"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface Props {
  isScrolled: boolean;
  categories: Category[];
  mobile?: boolean;
}

export default function ProductNavMenu({ isScrolled, categories, mobile = false }: Props) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-2 text-gray-700 text-lg font-medium"
        >
          Product
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="pl-4 flex flex-col gap-1 max-h-60 overflow-y-auto">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.slug}`}
                className="py-1.5 text-base text-gray-600 hover:text-blue-600 transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        className={`${
          !isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"
        } transition-colors flex items-center py-2 text-base lg:text-lg`}
      >
        Product
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      <div className="absolute top-full left-0 w-80 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="bg-white border border-gray-100 rounded-md shadow-lg py-2 max-h-[70vh] overflow-y-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${cat.slug}`}
              className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
