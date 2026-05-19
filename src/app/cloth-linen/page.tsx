"use client";

import { Anchor, ArrowLeft, Package, CheckCircle, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ClothLinenPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      title: "PLASTIC, FLAT DUST PANS",
      category: "Cabin Stores",
      description: "High-quality, durable linen specifically designed for maritime use. Includes bed sheets, pillowcases, blankets, and towels that withstand industrial laundering while maintaining comfort for the crew.",
      image: "https://getshared.com/dashboard/api/files/883df920-528d-11f1-8264-ac1f6b763f30/stream?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3NDU1LCJlbWFpbCI6Im55dWxtYWM5M0BnbWFpbC5jb20iLCJpYXQiOjE3Nzg2NTA1MzEsImV4cCI6MTc4MTI0MjUzMX0.Ooqbg6wHNS-DMdYbh4b7ZfwJIzZDSDV3QJ29t4a9L3U&t=1779176784110",
      features: ["100% Cotton", "Industrial Washable", "Maritime Standard", "High Thread Count"]
    },
    {
      id: 2,
      title: "TOILET BRUSH, NYLON",
      category: "Apparel",
      description: "Professional uniforms for all ranks and robust workwear for deck and engine crew. Flame-retardant coveralls, high-visibility jackets, and specialized maritime safety clothing.",
      image: "https://getshared.com/dashboard/api/files/6df507c1-528d-11f1-8264-ac1f6b763f30/stream?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ3NDU1LCJlbWFpbCI6Im55dWxtYWM5M0BnbWFpbC5jb20iLCJpYXQiOjE3Nzg2NTA1MzEsImV4cCI6MTc4MTI0MjUzMX0.Ooqbg6wHNS-DMdYbh4b7ZfwJIzZDSDV3QJ29t4a9L3U&t=1779176843341",
      features: ["Flame Retardant Options", "High Visibility", "Durable Fabric", "All Sizes Available"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Anchor className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Haluan Group</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/5s.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-blue-500/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Package className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100 font-medium">Product Catalog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Cloth & Linen Products</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Supplying high-quality maritime textiles, from durable crew workwear to premium cabin bedding and galley linens. Built to withstand the harsh marine environment.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                <div
                  className="aspect-w-16 aspect-h-12 relative overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                  onClick={() => product.image && setSelectedImage(product.image)}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-sm font-medium">Image Not Available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>

                <div className="p-6 flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in our products?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Contact our sales team today to request a quote or to learn more about our complete range of maritime supplies.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              Close (X)
            </button>
            <img
              src={selectedImage}
              alt="Product View"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
