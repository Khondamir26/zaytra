'use client';

import Image, { StaticImageData } from 'next/image';
import kpi from "@/img/kpi-vid.gif";
import praaktisgo from "@/img/praaktisgo.png";
import turanSecurity from "@/img/turansec.gif";
import HeroImage from '@/components/HeroImage';

// import { PaginationDemo } from "@/components/pagination-demo"

import {
  Search,
  Filter,
  Star,
  ArrowRight,
  Users,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Footer from '@/components/Footer';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import StarBackground from '@/components/StarBackground';

interface Product {
  id: number;
  name: string;
  company: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  currency?: string;
  billing?: string;
  price: number | string;
  languages: string[];
  clients: number;
  demo: boolean;
  featured: boolean;
  image: StaticImageData;
  link: string;
  tags: string[];
}

const Marketplace = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".animate-fade-in-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 200);
  // }, []);

  const categories = [
    { id: 'all', label: 'All Software', count: 142 },
    { id: 'erp', label: 'ERP Systems', count: 28 },
    { id: 'crm', label: 'CRM Software', count: 24 },
    { id: 'fintech', label: 'Fintech', count: 18 },
    { id: 'hr', label: 'HR Management', count: 15 },
    { id: 'education', label: 'Education', count: 22 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 19 },
    { id: 'healthcare', label: 'Healthcare', count: 16 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Kpi.com",
      company: "TechFlow Solutions",
      category: "erp",
      description: "KPI: All-in-One Business Management Solution is a powerful software designed to streamline business operations and track key performance indicators (KPIs). It covers core business areas including Accounts, Sales, Human Resources, Projects, Payroll, Reports, and Documents.",
      rating: 4.8,
      reviews: 156,
      price: "Custom pricing",
      currency: "USD",
      billing: "month",
      languages: ["EN", "RU", "AR"],
      clients: 1500,
      demo: true,
      featured: true,
      image: kpi,
      link: "https://www.kpi.com/",
      tags: ["Cloud-based", "Multi-language", "API Integration", "HR & Payroll", "Comprehensive Reports"]
    },
    {
      id: 2,
      name: "PraaktisGo",
      company: "FinTech Innovations",
      category: "healthcare",
      description: "PraaktisGo: Your All-In-One Gym Management Platform. Streamline gym operations and grow your business with minimal effort. Access everything you need from any device—whether on the web or through our intuitive mobile app. Key features include Engaging Memberships to attract and retain more clients, Multi-Branch Control to seamlessly manage all your gym branches, Smart Scheduling for group classes and personal training sessions, and Actionable Analytics to track and optimize operations.",
      rating: 4.9,
      reviews: 89,
      price: "Custom pricing",
      currency: "USD",
      billing: "month",
      languages: ["EN", "AR", "FR"],
      clients: 120,
      demo: true,
      featured: false,
      image: praaktisgo,
      link: "https://www.praaktisgo.com/",
      tags: ["Engaging Memberships", "Multi-Branch Control", "Actionable Analytics", "Mobile App Access"]
    },
    {
      id: 6,
      name: "TuranSec",
      company: "Turan Security | WHITE HAT LLC | WEB PENTEST",
      category: "cybersecurity",
      description: "Your trusted partner in cybersecurity. Protect your business with comprehensive solutions from industry experts.",
      rating: 4.9,
      reviews: 312,
      price: "Custom pricing",
      currency: "USD",
      billing: "project",
      languages: ["EN", "RU", "AR"],
      clients: 850,
      demo: true,
      featured: true,
      image: turanSecurity,
      link: "https://www.turansec.uz/",
      tags: [
        "Internal Pentest",
        "External Pentest",
        "Mobile Pentest",
        "Web Pentest",
        "Risk Assessment",
        "Password Audit"
      ]
    }

  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-24 pb-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors ">

      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-b from-[#00C3C1]/65 to-white relative min-h-screen flex items-center justify-center overflow-hidden ">
        <StarBackground />
        {/* Левая иконка (только на десктопе) */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between ">

          {/* Left Side - Image */}
          {/* Left Side - Image */}
          <div className="flex-1 flex justify-center">
            <HeroImage />
          </div>

          {/* Right Side - Text */}
          <div className="flex-1 text-center md:justify-end space-y-8">
            <div className="flex md:justify-end items-center justify-center space-x-4 my-6">

              <p className="text-xl uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                You create. We scale. Join Zaytra.
              </p>
              
            </div>

            <div className="space-y-4 md:text-right ">
              <h1 className=" text-4xl lg:text-6xl font-semibold leading-tight text-black">
                Discover
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Uzbek Software
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                Innovative B2B software
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-10 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search software, companies, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl pl-10 py-3 text-lg"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 rounded-2xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className=" rounded-2xl bg-popover text-popover-foreground border-border">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-2xl md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="rounded-2xl h-full w-full grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 ring-1 ring-muted/ bg-muted/50">
            {categories.slice(0, 8).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="rounded-full text-xs lg:text-sm"
              >
                {category.label.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length} Software Solutions
              </h2>
              <p className="text-muted-foreground">
                {selectedCategory === 'all'
                  ? 'All categories'
                  : categories.find((c) => c.id === selectedCategory)?.label}
              </p>
            </div>
            <Select defaultValue="featured">
              <SelectTrigger className="w-48 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className=" rounded-xl bg-popover text-popover-foreground border-border">
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`flex justify-between group ring-2 hover:ring-accent hover:shadow-lg transition duration-300 ${product.featured ? '' : ''
                  }`}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={250}
                      className="w-full h-65 object-fit group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background text-foreground rounded-full">
                        {categories.find((c) => c.id === product.category)?.label || product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-1">
                      {product.languages.map((lang) => (
                        <Badge
                          key={lang}
                          variant="outline"
                          className="text-xs bg-background/80 rounded-full"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {product.company}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className=" flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{product.clients}+ clients</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="space-y-1">
                      <div className="flex items-center text-lg font-bold text-primary gap-1">
                        {typeof product.price === "number" ? (
                          <>
                            <span>
                              From {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: product.currency || "USD",
                              }).format(product.price)}
                              /{product.billing}
                            </span>
                          </>
                        ) : (
                          <span>{product.price}</span>
                        )}
                      </div>

                      {product.demo && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          Free demo available
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ">
                      <Link
                        href={product.link}
                        target={product.link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 px-2 py-0.5 text-md font-semibold whitespace-nowrap w-fit 
    rounded-full border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="mb-10 flex justify-center">
              {/* <PaginationDemo
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              /> */}
              <Button variant="outline" size="lg" className="rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer ring-2 ring-accent/ bg-muted">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Marketplace;
