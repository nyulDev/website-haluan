"use client";

import { useState, useEffect } from "react";
import ProductNavMenu from "@/components/ProductNavMenu";
import {
  Menu,
  X,
  CheckCircle,
  Anchor,
  MapPin,
  Clock,
  Shield,
  Package,
  Wrench,
  Globe,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Users,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
const heroSlides = [
  {
    id: 1,
    title: "No# 1 Solution for Ships Supplier",
    subtitle: "We Provide The Best Service In Supply",
    image: "/slider/slide1.jpeg",
    gradient: "from-blue-600/20 to-blue-800/30",
  },
  {
    id: 2,
    title: "Marine Spare Parts Specialist",
    subtitle: "Quality Equipment for Maritime Industry",
    image: "/slider/slider2.jpeg",
    gradient: "from-cyan-600/20 to-blue-700/30",
  },
  {
    id: 3,
    title: "24/7 Service Available",
    subtitle: "Your Trusted Partner in Marine Services",
    image: "/slider/24.png",
    gradient: "from-teal-600/20 to-blue-800/30",
  },
  {
    id: 4,
    title: "Nationwide Coverage",
    subtitle: "Serving All Major Ports Across Indonesia",
    image: "/slider/slide4.jpeg",
    gradient: "from-blue-700/20 to-indigo-800/30",
  },
  {
    id: 5,
    title: "Provisions",
    subtitle:
      "Each provision, you can choose the one that best suits your brand or needs.",
    image: "/slider/5s.jpeg",
    gradient: "from-blue-700/20 to-indigo-800/30",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  interface GalleryImage {
    id: number;
    category: string;
    title: string;
    image: string;
  }

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload images
    const imagePromises = heroSlides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Continue even if some images fail
  }, []);



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const customers = [
    {
      name: "",
      logo: "/customer/andika.jpeg",
      color: "text-red-600",
    },
    {
      name: "",
      logo: "https://www.indobaruna.com/assets_frontend/ico/richlink.jpg",
      color: "text-blue-600",
    },
    {
      name: "",
      logo: "/customer/humpuss.jpeg",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/dbn (11).jpg",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/hong.jpeg",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/ARK1.png",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/waruna1.png",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/jsk.jpeg",
      color: "text-orange-600",
    },
    {
      name: "",
      logo: "/customer/k.jpg",
      color: "text-orange-600",
    },

    {
      name: "",
      logo: "/customer/PSI.png",
      color: "text-orange-600",
    },
  ];

  const galleryImages = [
    {
      id: 1,
      title: "Cargo Ship at Port",
      image: "/galery-activity/AC1.jpeg",
    },
    {
      id: 2,
      title: "Marine Operations",
      image: "/galery-activity/AC2.jpeg",
    },
    {
      id: 3,
      title: "Marine Equipment",
      image: "/galery-activity/AC3.jpeg",
    },
    {
      id: 4,
      title: "Safety Equipment",
      image: "/galery-activity/AC4.png"
    },
    {
      id: 5,
      title: "Logistics Operations",
      image: "/galery-activity/AC5.jpeg",
    },
    {
      id: 6,
      title: "Port Operations",
      image: "/galery-activity/AC6.jpeg",
    },
    {
      id: 7,
      title: "Ship Supply Services",
      image: "/galery-activity/AC7.jpeg",
    },
    {
      id: 8,
      title: "Our Professional Team",
      image: "/galery-activity/AC8.jpeg",
    },
    {
      id: 9,
      title: "Marine Technology",
      image: "/galery-activity/AC9.jpeg",
    },
    {
      id: 10,
      title: "Global Shipping",
      image: "/galery-activity/AC10.jpeg",
    },
    {
      id: 11,
      title: "Quality Control",
      image: "/galery-activity/AC11.jpeg",
    },
    {
      id: 12,
      title: "24/7 Support",
      image: "/galery-activity/AC12.jpeg",
    },
  ];

  const ports = [
    "Tanjung Priok/Jakarta",
    "Cilegon",
    "Merak",
    "Cigading",
    "Ciwandan",
    "Lampung",
    // "Semarang",
    "Surabaya",
    "Makassar",
    "Morowali",
  ];

  const services = [
    {
      icon: Package,
      title: "Ships Supplier / Chandler",
      description:
        "Provisions, bonded stores, deck stores, engine stores, galley, safety equipment, etc with necessary infrastructure, system, and quality control monitoring",
      features: [
        "Quality Products",
        "Competitive Prices",
        "Just-in-Time Delivery",
      ],
    },
    {
      icon: Wrench,
      title: "Marine Spare Parts",
      description:
        "Main Engine (Marine Propulsion), Auxiliary Engine (Generator), Air Compressor, Pumps, Oil Purifier, and other marine equipment",
      features: [
        "OEM Parts",
        "Wide Selection",
        "Technical Support",
        "Quality Guarantee",
      ],
    },
  ];

  const advantages = [
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description:
        "Outstanding service with strict quality control monitoring system",
    },
    {
      icon: Shield,
      title: "Safety Equipment",
      description:
        "Full range of SOLAS, I.M.O and local safety certified equipment",
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Serving all major ports across Indonesia",
    },
    {
      icon: Users,
      title: "Experienced Team",
      description:
        "Professional teamwork with extensive marine industry experience",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header - Dynamic text color for better contrast */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg text-gray-900"
          : "bg-transparent text-white"
          }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* <Anchor
                className={`w-8 h-8 ${isScrolled ? "text-blue-600" : "text-white"}`}
              /> */}
              <div className="flex items-center gap-3">
                <img
                  src="/logo/hdn-outline.png"
                  alt="Haluan Group"
                  className="h-24 w-auto object-contain"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                {/* <span
                  className={`${!isScrolled ? "text-white" : "text-blue-800"
                    } font-bold tracking-wide text-lg sm:text-xl`}
                >
                  HALUAN GROUP
                </span> */}
              </div>
            </div>

            {/* Desktop Navigation - increased font size */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a
                href="#home"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Home
              </a>
              <ProductNavMenu isScrolled={isScrolled} />
              <a
                href="#services"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Services
              </a>
              <a
                href="#customers"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Customers
              </a>
              <a
                href="#gallery"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Gallery
              </a>
              <a
                href="#coverage"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Coverage
              </a>
              <a
                href="#about"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                About
              </a>
              <a
                href="#contact"
                className={`${!isScrolled ? "text-white hover:text-blue-200" : "text-gray-700 hover:text-blue-600"} transition-colors text-base lg:text-lg`}
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation - font size increased */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <a
                href="#home"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Home
              </a>
              <ProductNavMenu isScrolled={isScrolled} mobile />
              <a
                href="#services"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Services
              </a>
              <a
                href="#customers"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Customers
              </a>
              <a
                href="#gallery"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Gallery
              </a>
              <a
                href="#coverage"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Coverage
              </a>
              <a
                href="#about"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                About
              </a>
              <a
                href="#contact"
                className={`block py-2 text-base ${!isScrolled ? "text-white" : "text-gray-700"} hover:text-blue-600 transition-colors`}
              >
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Slider - added text shadow for readability */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-100`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
              ></div>
              {/* Stronger dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Anchor className="w-20 h-20 text-blue-400 mx-auto mb-6" />
              <div className="h-24 md:h-32 mb-6 relative overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <h1
                    key={slide.id}
                    className={`absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white transition-all duration-700 transform [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] ${index === currentSlide
                      ? "translate-x-0 opacity-100"
                      : index < currentSlide
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                      }`}
                  >
                    {slide.title}
                  </h1>
                ))}
              </div>
              <div className="h-8 md:h-10 relative overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <p
                    key={slide.id}
                    className={`absolute inset-0 flex items-center justify-center text-xl md:text-2xl text-blue-100 font-semibold transition-all duration-700 transform [text-shadow:0_1px_5px_rgba(0,0,0,0.6)] ${index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : index < currentSlide
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                      }`}
                  >
                    {slide.subtitle}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
              >
                SEE SERVICES
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-400 text-blue-200 rounded-lg hover:bg-blue-600/20 transition-colors font-semibold backdrop-blur-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Specialization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment is to satisfy an ever-growing customer base with
              our outstanding service and quality guarantee
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Customers Section */}
      <section id="customers" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Customers
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have successfully provided projects for clients in Indonesia
              and globally, with the majority of our customers expressing
              satisfaction with our services
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group"
                >
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className={`w-24 h-24 md:w-32 md:h-32 mb-3 object-contain group-hover:scale-110 transition-transform duration-300 ${customer.color}`}
                  />
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {customer.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 italic">
              "Trusted by leading companies in the maritime industry across
              Indonesia and globally"
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <ImageIcon className="w-7 h-7 text-blue-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Gallery Activity
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our marine operations, equipment, and services through
              visual journey
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-white"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-square flex items-center justify-center p-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <div className="text-xs font-semibold text-blue-300 mb-1">
                        {item.category}
                      </div>
                      <div className="text-sm font-medium">{item.title}</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 italic">
              "Capturing moments of excellence in marine services and
              operations"
            </p>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-96 h-96 mx-auto object-cover rounded-xl mb-4 shadow-2xl"
              />
              <div className="text-sm font-semibold text-blue-600 mb-2">
                {selectedImage.category}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 mb-6">
                This image represents our commitment to excellence in{" "}
                {selectedImage.category.toLowerCase()} and marine services.
              </p>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Section */}
      <section
        id="coverage"
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nationwide Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serving all major ports across Indonesia with reliable and
              efficient delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Service Ports
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ports.map((port, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">{port}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Haluan Group
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience, quality, and commitment to excellence in marine
              services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="p-4 bg-blue-100 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <advantage.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                High Priority to Serve Customers
              </h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                We provide smooth delivery to your vessel, just-in-time,
                treating each customer with courtesy, respect and understanding.
                Customers will benefit from our cost-effective solutions, our
                experience, and strong commitment to quality efficient service.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-200">Service Availability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className="text-blue-200">Major Ports</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-200">Quality Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High Priority to Serve Customers. Contact us for reliable and
              efficient service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Office Address
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                      <span className="text-gray-700">
                        Gd. One Pacific Place, Level 11 SCBD
                        <br />
                        Jl. Jend. Sudirman Kav. 52-53
                        <br />
                        Kebayoran Baru – Jakarta Selatan 12190
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <span className="text-gray-700 block">
                          Office: +62-21-21275897
                        </span>
                        <span className="text-gray-700 block">
                          FAX: +62-21-7536093
                        </span>
                        <span className="text-gray-700 block">
                          Mobile/WA: +62-811-821723
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <span className="text-gray-700 block">
                          sales@haluan-group.com
                        </span>
                        <span className="text-gray-700 block">
                          haluan.group@yahoo.co.id
                        </span>
                        <span className="text-gray-700 block">
                          sales@haluan.id
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Anchor className="w-6 h-6" />
              <span className="text-xl font-bold">Haluan Group</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2026 Haluan Group. All rights reserved.
              </p>
              <p className="text-gray-400 mt-1">
                Ships Supplier & Ships Chandler Indonesia
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
