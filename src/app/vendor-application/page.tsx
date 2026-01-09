"use client";

import { usePathname, useSearchParams } from "next/navigation"
import CountrySelect from '@/components/CountrySelect';
import React, { useRef, useState } from 'react';
import { MultiSelect } from "@/components/ui/multi-select"
import {
    Send,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Footer from '@/components/Footer';
import { useEffect } from "react";
import { toast } from "sonner";
import { PaginationDemo } from '@/components/pagination-demo';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { sanitizePayload } from "@/lib/sanitizePayload";
import StarBackground from '@/components/StarBackground';
import HeroImage from "@/components/HeroImage";
// Types for your form data
interface VendorFormData {
    // Section 1: Company Information
    legalCompanyName: string;
    brandName: string;
    country: string;
    website: string;
    yearFounded: string;
    employees: string;
    itParkResident: string;

    // Section 2: Primary Contact
    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    linkedin: string;

    // Section 3: Product Overview
    productName: string;
    productPitch: string;
    productCategory: string[];
    productDescription: string;
    targetIndustries: string[];
    supportedLanguages: string[];
    pricingModel: string[];
    startingPrice: string;
    isLive: string;
    liveLink: string;
    productVideo: string; // keep this if used elsewhere
    productFile: File | null; // ✅ new file Input
    productVideoLink: string;
    pitchDeck: File | null;

    // Section 4: Integration & Compatibility
    hasApiOrSdk: string;
    integrationMethods: string[];
    modularCompatible: string;
    modularFeaturesDescription: string;
    apiDocsLink: string;
    hasSandbox: string;
    leadResponseTime: string;

    // Section 5: Commercial Terms
    listingPlan: string;
    acceptedCommission: string;
    customCommission: string,
    needsLegalEntityPerDeal: string;
    localizedSupport: string;
    preferredMarkets: string[];

    // Section 6: Additional Materials
    caseStudiesVideo: string; // keep this if used elsewhere
    caseStudiesFile: File | null; // ✅ new file Input
    caseStudiesLink: string;
    testimonialsFile: File | null;
    testimonialsLink: string;
    certifications: File | null;
    pressLinks: string;
    extraInfo: string;

    // Agreement & Submission
    submitterName: string;
    submitterPosition: string;
    agreeToTerms: boolean;
    agreeToContact: boolean;
    submissionDate: string;
}
interface VendorApiResponse {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(arg0: string, error: any): unknown;
    // Same structure as FormData, but file fields become URLs or filenames
    legalCompanyName: string;
    brandName: string;
    country: string;
    website: string;
    yearFounded: string;
    employees: string;
    itParkResident: string;

    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    linkedin: string;

    productName: string;
    productPitch: string;
    productCategory: string[];
    productDescription: string;
    targetIndustries: string[];
    supportedLanguages: string[];
    pricingModel: string[];
    startingPrice: string;
    isLive: string;
    liveLink: string;
    productVideo: string;
    productFileUrl?: string; // uploaded file becomes a URL
    productVideoLink: string;
    pitchDeckUrl?: string;

    hasApiOrSdk: string;
    integrationMethods: string[];
    modularCompatible: string;
    modularFeaturesDescription: string;
    apiDocsLink: string;
    hasSandbox: string;
    leadResponseTime: string;

    listingPlan: string;
    acceptedCommission: string;
    customCommission: string;
    needsLegalEntityPerDeal: string;
    localizedSupport: string;
    preferredMarkets: string[];

    caseStudiesVideo: string;
    caseStudiesFileUrl?: string;
    caseStudiesLink: string;
    testimonialsFileUrl?: string;
    testimonialsLink: string;
    certificationsUrl?: string;
    pressLinks: string;
    extraInfo: string;

    submitterName: string;
    submitterPosition: string;
    agreeToTerms: boolean;
    agreeToContact: boolean;
    submissionDate: string;
}


const VendorApp = () => {
    const formRef = useRef<HTMLDivElement | null>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const shouldScroll = searchParams.get("scroll") === "1";

    useEffect(() => {
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

    useEffect(() => {
        if (pathname !== "/vendor-application" || !shouldScroll || !formRef.current) return;

        // Если где-то глобально включено CSS smooth, отключим на время,
        // чтобы не конфликтовать с кастомной анимацией
        const root = document.documentElement;
        const prevBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";

        const targetY = formRef.current.getBoundingClientRect().top + window.scrollY;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 2500; // медленнее — увеличь число
        let startTime: number | null = null;
        let rafId = 0;

        const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

        const step = (time: number) => {
            if (startTime === null) startTime = time;
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);

            window.scrollTo(0, startY + distance * eased);

            if (elapsed < duration) {
                rafId = requestAnimationFrame(step);
            } else {
                root.style.scrollBehavior = prevBehavior; // вернуть поведение
            }
        };

        // даём кадр на layout после навигации
        const rafStart = requestAnimationFrame(() => {
            rafId = requestAnimationFrame(step);
        });

        return () => {
            cancelAnimationFrame(rafId);
            cancelAnimationFrame(rafStart);
            root.style.scrollBehavior = prevBehavior;
        };
    }, [pathname, shouldScroll]);



    const [formData, setFormData] = useState<VendorFormData>({
        // Section 1: Company Information
        legalCompanyName: '',
        brandName: '',
        country: '',
        website: '',
        yearFounded: '',
        employees: '',
        itParkResident: '', // 'yes' or 'no'

        // Section 2: Primary Contact
        contactName: '',
        contactTitle: '',
        contactEmail: '',
        contactPhone: '',
        linkedin: '',

        // Section 3: Product Overview
        productName: '',
        productPitch: '',
        productCategory: [], // array of selected categories
        productDescription: '',
        targetIndustries: [],
        supportedLanguages: [],
        pricingModel: [],
        startingPrice: '',
        isLive: '', // 'yes' or 'no'
        liveLink: '',
        productVideo: '',
        productFile: null,
        productVideoLink: '',
        pitchDeck: null, // File or null

        // Section 4: Integration & Compatibility
        hasApiOrSdk: '', // 'yes' or 'no'
        integrationMethods: [],
        modularCompatible: '', // 'yes' or 'no'
        modularFeaturesDescription: '',
        apiDocsLink: '',
        hasSandbox: '', // 'yes' or 'no'
        leadResponseTime: '',

        // Section 5: Commercial Terms
        listingPlan: '', // 'freemium', 'standard', etc.
        acceptedCommission: '',
        customCommission: '',
        needsLegalEntityPerDeal: '', // 'yes' or 'no'
        localizedSupport: '', // 'yes' or 'no'
        preferredMarkets: [],

        // Section 6: Additional Materials (Optional)
        caseStudiesVideo: '',
        caseStudiesFile: null,
        caseStudiesLink: '',
        testimonialsFile: null,
        testimonialsLink: '',
        certifications: null, // File
        pressLinks: '',
        extraInfo: '',

        // Agreement & Submission
        submitterName: '',
        submitterPosition: '',
        agreeToTerms: false,
        agreeToContact: false,
        submissionDate: '',
    });
    const industries = [
        { label: "Retail", value: "Retail" },
        { label: "Finance", value: "Finance" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Education", value: "Education" },
        { label: "Government", value: "Government" },
        { label: "Other", value: "Other" },
    ]
    const categories = [
        { label: "CRM", value: "CRM" },
        { label: "ERP", value: "ERP" },
        { label: "HR", value: "HR" },
        { label: "Accounting", value: "Accounting" },
        { label: "EdTech", value: "EdTech" },
        { label: "HealthTech", value: "HealthTech" },
        { label: "Other", value: "Other" }
    ];
    const languages = [
        { label: "English", value: "English" },
        { label: "Arabic", value: "Arabic" },
        { label: "French", value: "French" },
        { label: "Russian", value: "Russian" },
        { label: "Uzbek", value: "Uzbek" },
    ];
    const pricingModel = [
        { label: "Freemium", value: "Freemium" },
        { label: "Subscription", value: "Subscription" },
        { label: "Tiered", value: "Tiered" },
        { label: "Pay-per-use", value: "Pay-per-use" },
        { label: "One-time", value: "One-time" },
    ]
    const methods = [
        { label: "API", value: "API" },
        { label: " Embed/iFrame", value: " Embed/iFrame" },
        { label: "Widget", value: "Widget" },
        { label: "Webhook", value: "Webhook" },
        { label: "Zapier", value: "Zapier" },
        { label: "Other", value: "Other" },
    ]
    const markets = [
        { label: "KSA", value: "KSA" },
        { label: "UAE", value: "UAE " },
        { label: "Nigeria", value: "Nigeria" },
        { label: "Kenya", value: "Kenya" },
        { label: "South Africa", value: "South Africa" },
        { label: "Other", value: "Other" },
    ]

    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form field changes
    function handleChange(field: string, value: string | string[] | File | boolean | null) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }



    const handleMultiChange = (field: keyof VendorFormData, value: string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };



    const initialFormData: VendorFormData = {
        legalCompanyName: '',
        brandName: '',
        country: '',
        website: '',
        yearFounded: '',
        employees: '',
        itParkResident: '',
        contactName: '',
        contactTitle: '',
        contactEmail: '',
        contactPhone: '',
        linkedin: '',
        productName: '',
        productPitch: '',
        productCategory: [],
        productDescription: '',
        targetIndustries: [],
        supportedLanguages: [],
        pricingModel: [],
        startingPrice: '',
        isLive: '',
        liveLink: '',
        productVideo: '',
        productFile: null,
        productVideoLink: '',
        pitchDeck: null,
        hasApiOrSdk: '',
        integrationMethods: [],
        modularCompatible: '',
        modularFeaturesDescription: '',
        apiDocsLink: '',
        hasSandbox: '',
        leadResponseTime: '',
        listingPlan: '',
        acceptedCommission: '',
        customCommission: '',
        needsLegalEntityPerDeal: '',
        localizedSupport: '',
        preferredMarkets: [],
        caseStudiesVideo: '',
        caseStudiesFile: null,
        caseStudiesLink: '',
        testimonialsFile: null,
        testimonialsLink: '',
        certifications: null,
        pressLinks: '',
        extraInfo: '',
        submitterName: '',
        submitterPosition: '',
        agreeToTerms: false,
        agreeToContact: false,
        submissionDate: '', // может быть перезаписана при сабмите
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const rawPayload = {
                ...formData,

                // ✅ Обработка файлов
                productFile: formData.productFile instanceof File ? formData.productFile.name : "",
                pitchDeck: formData.pitchDeck instanceof File ? formData.pitchDeck.name : "",
                caseStudiesFile: formData.caseStudiesFile instanceof File ? formData.caseStudiesFile.name : "",
                testimonialsFile: formData.testimonialsFile instanceof File ? formData.testimonialsFile.name : "",
                certifications: formData.certifications instanceof File ? formData.certifications.name : "",

                // ✅ Обработка массивов (MultiSelect) — всегда массив

                productCategory: Array.isArray(formData.productCategory) ? formData.productCategory : [],
                targetMarkets: Array.isArray(formData.targetIndustries) ? formData.targetIndustries : [],
                preferredMarkets: Array.isArray(formData.preferredMarkets) ? formData.preferredMarkets : [],
                integrations: Array.isArray(formData.integrationMethods) ? formData.integrationMethods : [],
                pricingModels: Array.isArray(formData.pricingModel) ? formData.pricingModel : [],
                languagesSupported: Array.isArray(formData.supportedLanguages) ? formData.supportedLanguages : [],

                // ✅ Чекбоксы
                agreeToTerms: !!formData.agreeToTerms,
                agreeToContact: !!formData.agreeToContact,

                // ✅ Дата
                submissionDate: formData.submissionDate || new Date().toISOString(),
            };

            const cleanedPayload = sanitizePayload(rawPayload);

            console.log("📤 Sending cleaned payload:", cleanedPayload);

            const response = await fetch("/api/vendor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cleanedPayload),
            });

            const data: VendorApiResponse = await response.json();

            if (response.ok) {
                toast.success("Application submitted successfully!", {
                    description: "We'll get back to you soon.",
                });
                setFormData(initialFormData); // сброс формы
            } else {
                console.error("❌ API Error:", data.error);
                toast.error("Submission Failed", {
                    description: data.message || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            toast.error("Network Error", {
                description: "Please check your connection and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground ">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#00C3C1]/65 to-white relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in-up">
        <StarBackground />
        {/* Левая иконка (только на десктопе) */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between ">

          {/* Left Side - Image */}
          <div className="flex-1 flex justify-center">
            <HeroImage />
          </div>

          {/* Right Side - Text */}
          <div className="flex-1 text-center md:justify-end space-y-8 animate-fade-in-up">
            <div className="flex md:justify-end items-center justify-center space-x-4 my-6">

              <p className="text-xl uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
                You create. We scale. Join Zaytra.
              </p>
              
            </div>

            <div className="space-y-4 md:text-right animate-fade-in-up">
              <h1 className=" text-4xl lg:text-6xl font-semibold leading-tight text-black">
                Become a
                <span className="block text-3xl lg:text-5xl bg-clip-text drop-shadow-sm">
                  Vendor
                </span>
              </h1>
              <p className="inline-block text-xl border-b-2 border-white pb-1 uppercase text-white font-bold tracking-wide [text-shadow:1px_1px_2px_black]">
               Apply. Launch. Grow.
              </p>
            </div>

          </div>
        </div>
      </section>


            {/* Contact Form & Info */}
            <section className="py-16 animate-fade-in-up">
                <div id="vendor-form" ref={formRef} className="container mx-auto px-4">
                    <div className="grid gap-12 items-center mx-auto">
                        <div className="lg:col-span-4 text-center">
                            <h2 className="text-3xl font-semibold">Vendor Application Form</h2>
                            <p className="text-muted-foreground mt-2">
                                Apply to list your B2B product and make it available as a modular app feature on <span className="font-bold">Zaytra.ai</span>
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className='lg:col-span-4 h-full '>
                            {/* Company Info  --- Section 1*/}
                            {currentSection === 0 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                1. Company Information
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Legal Company Name *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="text"
                                                            placeholder="Enter your full name"
                                                            value={formData.legalCompanyName}
                                                            onChange={(e) =>
                                                                handleChange('legalCompanyName', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Brand / Product Name *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="text"
                                                            placeholder="Enter your full name"
                                                            value={formData.brandName}
                                                            onChange={(e) =>
                                                                handleChange('brandName', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <CountrySelect
                                                        value={formData.country}
                                                        onChange={(val) => handleChange('country', val)}
                                                    />

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Company Website *
                                                        </label>
                                                        <Input
                                                            className="rounded-2xl"
                                                            required
                                                            type="url"
                                                            placeholder="https://yourcompany.com"
                                                            value={formData.website}
                                                            onChange={(e) =>
                                                                handleChange('website', e.target.value)
                                                            }
                                                        />

                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Year Founded *
                                                        </label>
                                                        <Input
                                                            required
                                                            className='rounded-2xl'
                                                            type="string"
                                                            placeholder="2025"
                                                            value={formData.yearFounded}
                                                            onChange={(e) =>
                                                                handleChange('yearFounded', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Number of Employees *
                                                        </label>
                                                        <Select value={formData.employees}
                                                            onValueChange={(value) => handleChange('employees', value)}>
                                                            <SelectTrigger className="w-full rounded-2xl">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Number</SelectLabel>
                                                                    <SelectItem value="1-10">1-10</SelectItem>
                                                                    <SelectItem value="11-50">11-50</SelectItem>
                                                                    <SelectItem value="51–200">51–200</SelectItem>
                                                                    <SelectItem value="201+">201+</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            IT Park Resident ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="itParkResident"
                                                                    value="Yes"
                                                                    checked={formData.itParkResident === 'Yes'}
                                                                    onChange={(e) => handleChange('itParkResident', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="itParkResident"
                                                                    value="No"
                                                                    checked={formData.itParkResident === 'No'}
                                                                    onChange={(e) => handleChange('itParkResident', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>

                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {/* : Primary Contact ---- Section 2 */}
                            {currentSection === 1 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                2. Primary Contact
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Full Name *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="text"
                                                            placeholder="Enter your full name"
                                                            value={formData.contactName}
                                                            onChange={(e) =>
                                                                handleChange('contactName', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Position / Title *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="string"
                                                            placeholder="Position"
                                                            value={formData.contactTitle}
                                                            onChange={(e) =>
                                                                handleChange('contactTitle', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Email Address *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            type="email"
                                                            placeholder="your-company@gmail.com"
                                                            value={formData.contactEmail}
                                                            onChange={(e) =>
                                                                handleChange('contactEmail', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Phone Number *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="tel"
                                                            placeholder="+998 91 123 45 67"
                                                            value={formData.contactPhone}
                                                            onChange={(e) =>
                                                                handleChange('contactPhone', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            LinkedIn Profile *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="url"
                                                            placeholder="https://linkedin.com/in/your-username"
                                                            value={formData.linkedin}
                                                            onChange={(e) =>
                                                                handleChange('linkedin', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {/* : : Product Overview ---- Section 3 */}
                            {currentSection === 2 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                3. Product Overview
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Product Name *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="text"
                                                            placeholder="Name"
                                                            value={formData.productName}
                                                            onChange={(e) =>
                                                                handleChange('productName', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            One-line Product Pitch*
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="text"
                                                            placeholder="Text(max 150 characters)"
                                                            value={formData.productPitch}
                                                            onChange={(e) =>
                                                                handleChange('productPitch', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Product Category *
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.productCategory}
                                                            onChange={(newValues) => {
                                                                handleMultiChange("productCategory", newValues);
                                                            }}
                                                            options={categories}
                                                        />

                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Target Industries *
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.targetIndustries}
                                                            onChange={(newValues) => handleMultiChange("targetIndustries", newValues)}
                                                            options={industries}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Languages *
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.supportedLanguages}
                                                            onChange={(newValues) => handleMultiChange("supportedLanguages", newValues)}
                                                            options={languages}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Pricing Model *
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.pricingModel}
                                                            onChange={(newValues) => handleMultiChange("pricingModel", newValues)}
                                                            options={pricingModel}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Starting Price (USD) *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="number"
                                                            placeholder="Enter Price"
                                                            value={formData.startingPrice}
                                                            onChange={(e) =>
                                                                handleChange('startingPrice', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Link to live product/demo *
                                                        </label>
                                                        <Input
                                                            className="rounded-2xl"
                                                            required
                                                            type="url"
                                                            placeholder="https://your-product-demo.com"
                                                            value={formData.liveLink}
                                                            onChange={(e) =>
                                                                handleChange('liveLink', e.target.value)
                                                            }
                                                        />

                                                    </div>
                                                    <div className="space-y-2 flex flex-col justify-between">
                                                        {/* File upload UI */}
                                                        <div>
                                                            <label className="text-sm font-medium">Product Video/Presentation *</label>

                                                            <label
                                                                htmlFor="productFile"
                                                                className="flex items-center justify-between w-full rounded-2xl text-muted-foreground font-medium border border-input px-4 py-2 text-sm cursor-pointer hover:bg-accent transition"
                                                            >
                                                                {formData.productVideo ? formData.productVideo : "Upload your file here"}
                                                            </label>
                                                            <Input
                                                                id="productFile"
                                                                type="file"
                                                                accept="video/*,application/pdf"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        handleChange("productFile", file);
                                                                        handleChange("productVideoLink", ""); // clear link if file chosen
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        {/* OR separator */}
                                                        <div className="text-center text-sm text-muted-foreground font-bold tracking-wide">— OR —</div>

                                                        {/* Link Input */}
                                                        <Input
                                                            type="url"
                                                            placeholder="Paste YouTube or Vimeo link"
                                                            value={formData.productVideoLink}
                                                            onChange={(e) => {
                                                                handleChange("productVideoLink", e.target.value);
                                                                handleChange("productFile", null); // clear file if link entered
                                                            }}
                                                            className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Description *
                                                        </label>
                                                        <Textarea
                                                            required
                                                            rows={5}
                                                            placeholder="Tell us how we can help you..."
                                                            value={formData.productDescription}
                                                            onChange={(e) =>
                                                                handleChange('productDescription', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Is the product live and operational ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="isLive"
                                                                    value="Yes"
                                                                    checked={formData.isLive === 'Yes'}
                                                                    onChange={(e) => handleChange('isLive', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="isLive"
                                                                    value="No"
                                                                    checked={formData.isLive === 'No'}
                                                                    onChange={(e) => handleChange('isLive', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 ">
                                                        {/* PDF upload */}
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Upload Pitch Deck *</label>
                                                            <label
                                                                htmlFor="pitchDeck"
                                                                className="flex items-center justify-between w-full rounded-2xl text-muted-foreground font-medium border border-input px-4 py-2 text-sm cursor-pointer hover:bg-accent transition"
                                                            >
                                                                {formData.pitchDeck instanceof File
                                                                    ? formData.pitchDeck.name
                                                                    : formData.pitchDeck
                                                                        ? formData.pitchDeck
                                                                        : "Upload File (PDF only)"}
                                                            </label>

                                                            <Input
                                                                id="pitchDeck"
                                                                type="file"
                                                                accept="application/pdf"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0] || null;
                                                                    if (file && file.type === "application/pdf") {
                                                                        handleChange("pitchDeck", file);
                                                                        // Optionally clear any previous URL if set:
                                                                        // handleChange("pitchDeckUrl", "");
                                                                    } else {
                                                                        toast.warning("Please upload a PDF file only.");

                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                    </div>

                                                </div>

                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {/* : : Integration & Compatibility ---- Section 4 */}
                            {currentSection === 3 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                4. Integration & Compatibility
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Do you offer an API or SDK ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="ApiOrSdk"
                                                                    value="Yes"
                                                                    checked={formData.hasApiOrSdk === 'Yes'}
                                                                    onChange={(e) => handleChange('hasApiOrSdk', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="ApiOrSdk"
                                                                    value="No"
                                                                    checked={formData.hasApiOrSdk === 'No'}
                                                                    onChange={(e) => handleChange('hasApiOrSdk', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Integration method available *
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.integrationMethods}
                                                            onChange={(newValues) => handleMultiChange("integrationMethods", newValues)}
                                                            options={methods}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Does your team support Sandbox access or Trial environments ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="hasSandbox"
                                                                    value="Yes"
                                                                    checked={formData.hasSandbox === 'Yes'}
                                                                    onChange={(e) => handleChange('hasSandbox', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="hasSandbox"
                                                                    value="No"
                                                                    checked={formData.hasSandbox === 'No'}
                                                                    onChange={(e) => handleChange('hasSandbox', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>

                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Provide API documentation link (if available) *
                                                        </label>
                                                        <Input
                                                            className='rounded-2xl'
                                                            required
                                                            type="url"
                                                            placeholder="https://api.com"
                                                            value={formData.apiDocsLink}
                                                            onChange={(e) =>
                                                                handleChange('apiDocsLink', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Can your product be offered as a modular “block” in our no-code builder?
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="ismodular"
                                                                    value="Yes"
                                                                    checked={formData.modularCompatible === 'Yes'}
                                                                    onChange={(e) => handleChange('modularCompatible', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="ismodular"
                                                                    value="No"
                                                                    checked={formData.modularCompatible === 'No'}
                                                                    onChange={(e) => handleChange('modularCompatible', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>

                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Expected response time to Leads *
                                                        </label>
                                                        <Select
                                                            value={formData.leadResponseTime}
                                                            onValueChange={(value) => handleChange("leadResponseTime", value)}>
                                                            <SelectTrigger className="w-full rounded-2xl">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Response Time</SelectLabel>
                                                                    <SelectItem value="within 24h">Within 24h</SelectItem>
                                                                    <SelectItem value="within 48h">Within 48h</SelectItem>
                                                                    <SelectItem value="3+ days">3+ days</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            If yes, describe which features could be modularized *
                                                        </label>
                                                        <Textarea
                                                            required
                                                            rows={4}
                                                            placeholder="Describe..."
                                                            value={formData.modularFeaturesDescription}
                                                            onChange={(e) =>
                                                                handleChange('modularFeaturesDescription', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {/* : : Commercial Terms ---- Section 5 */}
                            {currentSection === 4 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                5. Commercial Terms
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Preferred Listing Plan ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="listingplan"
                                                                    value="Freemium"
                                                                    checked={formData.listingPlan === 'Freemium'}
                                                                    onChange={(e) => handleChange('listingPlan', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Freemium</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="listingplan"
                                                                    value="Standard"
                                                                    checked={formData.listingPlan === 'Standard'}
                                                                    onChange={(e) => handleChange('listingPlan', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Standard</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="listingplan"
                                                                    value="Premium"
                                                                    checked={formData.listingPlan === 'Premium'}
                                                                    onChange={(e) => handleChange('listingPlan', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Premium</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="listingplan"
                                                                    value="Enterprise"
                                                                    checked={formData.listingPlan === 'Enterprise'}
                                                                    onChange={(e) => handleChange('listingPlan', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Enterprise</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Marketplace Commission Accepted *
                                                        </label>
                                                        {formData.acceptedCommission === "Custom" ? (
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter custom %"
                                                                className="rounded-2xl"
                                                                value={formData.customCommission || ""}
                                                                onChange={(e) => {
                                                                    const value = e.target.value.replace(/[^0-9.]/g, "")
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        customCommission: value,
                                                                    }))
                                                                }}
                                                                onBlur={() => {
                                                                    if (formData.customCommission) {
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            acceptedCommission: `${prev.customCommission}%`,
                                                                        }))
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                        ) : (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" className="w-full justify-between rounded-2xl">
                                                                        {formData.acceptedCommission || "Select"}
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="w-full">
                                                                    <DropdownMenuItem onClick={() => handleChange("acceptedCommission", "10%")}>
                                                                        10%
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleChange("acceptedCommission", "15%")}>
                                                                        15%
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            setFormData((prev) => ({
                                                                                ...prev,
                                                                                acceptedCommission: "Custom",
                                                                                customCommission: "", // clear input initially
                                                                            }))
                                                                        }
                                                                    >
                                                                        Custom
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Do you require legal entity agreement for each lead/deal ?*
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="LegalEntity"
                                                                    value="Yes"
                                                                    checked={formData.needsLegalEntityPerDeal === 'Yes'}
                                                                    onChange={(e) => handleChange('needsLegalEntityPerDeal', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="LegalEntity"
                                                                    value="No"
                                                                    checked={formData.needsLegalEntityPerDeal === 'No'}
                                                                    onChange={(e) => handleChange('needsLegalEntityPerDeal', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Preferred markets for listing
                                                        </label>
                                                        <MultiSelect
                                                            selected={formData.preferredMarkets}
                                                            onChange={(newValues) => handleMultiChange("preferredMarkets", newValues)}
                                                            options={markets}
                                                        />

                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Will you offer localized support in any markets (e.g., Arabic, French)? *
                                                        </label>
                                                        <div className="flex gap-2 h-9 py-1  ">
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="localSupport"
                                                                    value="Yes"
                                                                    checked={formData.localizedSupport === 'Yes'}
                                                                    onChange={(e) => handleChange('localizedSupport', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">Yes</span>
                                                            </label>
                                                            <label className="flex items-center space-x-2">
                                                                <Input
                                                                    type="radio"
                                                                    name="localSupport"
                                                                    value="No"
                                                                    checked={formData.localizedSupport === 'No'}
                                                                    onChange={(e) => handleChange('localizedSupport', e.target.value)}
                                                                    className="h-4 w-4"
                                                                    required
                                                                />
                                                                <span className="text-sm">No</span>
                                                            </label>
                                                        </div>

                                                    </div>


                                                </div>

                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />

                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {/* : :  Additional Materials (Optional)---- Section 6 */}
                            {currentSection === 5 && (
                                <div className="lg:col-span-4 h-full ">
                                    <Card className="ring-2 ring-accent/ border-accent shadow-xl bg-card text-card-foreground">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Vendor Application Form</CardTitle>
                                            <p className="text-muted-foreground">
                                                6. Additional Materials (Optional)
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2 flex flex-col justify-between">
                                                        {/* File upload UI */}
                                                        <div>
                                                            <label className="text-sm font-medium">Customer Case Studies *</label>

                                                            <label
                                                                htmlFor="caseStudies"
                                                                className="flex items-center justify-between w-full rounded-2xl text-muted-foreground font-medium border border-input px-4 py-2 text-sm cursor-pointer hover:bg-accent transition"
                                                            >
                                                                {formData.caseStudiesVideo ? formData.caseStudiesVideo : "Upload your file"}
                                                            </label>
                                                            <Input
                                                                id="caseStudies"
                                                                type="file"
                                                                accept="*/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        handleChange("caseStudiesFile", file);
                                                                        handleChange("caseStudiesVideo", file.name);
                                                                        handleChange("caseStudiesLink", ""); // clear link if file chosen
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        {/* OR separator */}
                                                        <div className="text-center text-sm text-muted-foreground font-bold tracking-wide">— OR —</div>

                                                        {/* Link Input */}
                                                        <Input
                                                            type="url"
                                                            placeholder="Paste your link"
                                                            value={formData.caseStudiesLink}
                                                            onChange={(e) => {
                                                                let value = e.target.value.trim();

                                                                // Удаляем все начальные http:// или https:// перед добавлением
                                                                value = value.replace(/^https?:\/\//i, '');

                                                                // Добавляем https:// в начале
                                                                const finalValue = value ? `https://${value}` : '';

                                                                handleChange("caseStudiesLink", finalValue);
                                                                handleChange("caseStudiesFile", null); // clear file if link entered
                                                                handleChange("caseStudiesVideo", null); // clear file if link entered
                                                            }}
                                                            className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 ">
                                                        {/* Text & File Upload */}
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Testimonials*</label>
                                                            <label
                                                                htmlFor="Testimonials"
                                                                className="flex items-center justify-between w-full rounded-2xl text-muted-foreground font-medium border border-input px-4 py-2 text-sm cursor-pointer hover:bg-accent transition"
                                                            >
                                                                {formData.testimonialsFile instanceof File
                                                                    ? formData.testimonialsFile.name
                                                                    : formData.testimonialsFile
                                                                        ? formData.testimonialsFile
                                                                        : "Upload File (PDF, DOCX, etc.)"}
                                                            </label>

                                                            <Input
                                                                id="Testimonials"
                                                                type="file"
                                                                accept=".pdf,.doc,.docx,.txt"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0] || null;
                                                                    if (file) {
                                                                        handleChange("testimonialsFile", file);
                                                                        handleChange("testimonialsText", ""); // Clear text input if file is chosen
                                                                    }
                                                                }}
                                                            />
                                                            {/* OR separator */}
                                                            <div className="text-center text-sm text-muted-foreground font-bold tracking-wide">— OR —</div>

                                                            {/* Text Input */}
                                                            <Input
                                                                type="url"
                                                                placeholder="Paste your Testimonials link"
                                                                value={formData.testimonialsLink}
                                                                onChange={(e) => {
                                                                    let value = e.target.value.trim();

                                                                    // Удаляем все начальные http:// или https:// перед добавлением
                                                                    value = value.replace(/^https?:\/\//i, '');

                                                                    // Добавляем https:// в начале
                                                                    const finalValue = value ? `https://${value}` : '';

                                                                    handleChange("testimonialsLink", finalValue);
                                                                    handleChange("testimonialsFile", null);
                                                                }}
                                                                className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="space-y-2 ">
                                                        {/* Text & File Upload */}
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium">Certifications / Awards </label>
                                                            <label
                                                                htmlFor="Certifications"
                                                                className="flex items-center justify-between w-full rounded-2xl text-muted-foreground font-medium border border-input px-4 py-2 text-sm cursor-pointer hover:bg-accent transition"
                                                            >
                                                                {formData.certifications instanceof File
                                                                    ? formData.certifications.name
                                                                    : formData.certifications
                                                                        ? formData.certifications
                                                                        : "Upload File "}
                                                            </label>

                                                            <Input
                                                                id="Certifications"
                                                                type="file"
                                                                accept="*/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0] || null;
                                                                    if (file) {
                                                                        handleChange("certifications", file);

                                                                    }
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium ">
                                                            Press Coverage or PR links
                                                        </label>
                                                        <Input
                                                            type="url"
                                                            placeholder="PR link"
                                                            value={formData.pressLinks}
                                                            onChange={(e) => {
                                                                let value = e.target.value.trim();

                                                                // Удаляем все начальные http:// или https:// перед добавлением
                                                                value = value.replace(/^https?:\/\//i, '');

                                                                // Добавляем https:// в начале
                                                                const finalValue = value ? `https://${value}` : '';

                                                                handleChange("pressLinks", finalValue);
                                                                ;
                                                            }}
                                                            className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                        />

                                                    </div>
                                                    {/* Agreement & Submission Section */}
                                                    <div className="space-y-2 ">
                                                        <CardTitle className="text-xl">Agreement & Submission</CardTitle>
                                                        <label className="text-sm font-medium">1. Submitter Name</label>
                                                        <Input type="text" placeholder="Your name" value={formData.submitterName} onChange={e =>
                                                            handleChange("submitterName", e.target.value)}
                                                            className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                        />

                                                        <label className="text-sm font-medium">2. Submitter Position</label>
                                                        <Input type="text" placeholder="Your position" value={formData.submitterPosition} onChange={e =>
                                                            handleChange("submitterPosition", e.target.value)}
                                                            className="w-full rounded-2xl border px-4 py-2 text-sm border-border font-medium"
                                                        />

                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.agreeToTerms}
                                                                onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
                                                                id="agreeToTerms"
                                                                className="accent-primary"
                                                            />
                                                            <label htmlFor="agreeToTerms" className="text-sm font-medium">
                                                                I agree to the terms and conditions
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.agreeToContact}
                                                                onChange={(e) => handleChange("agreeToContact", e.target.checked)}
                                                                id="agreeToContact"
                                                                className="accent-primary"
                                                            />
                                                            <label htmlFor="agreeToContact" className="text-sm font-medium">
                                                                I agree to be contacted regarding my application
                                                            </label>
                                                        </div>


                                                        <label className="text-sm font-medium">Submission Date</label>
                                                        <Input
                                                            type="date"
                                                            value={formData.submissionDate}
                                                            onChange={(e) =>
                                                                setFormData({ ...formData, submissionDate: e.target.value })
                                                            }
                                                            className="w-max rounded-2xl border px-4 py-2 text-sm font-medium bg-muted"
                                                        />

                                                    </div>
                                                </div>
                                                <PaginationDemo
                                                    currentSection={currentSection}
                                                    setCurrentSection={setCurrentSection}
                                                />
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <Button
                                                        type="submit"
                                                        className="rounded-full cursor-pointer hover:opacity-90 flex-1"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-4 h-4 mr-2 " />
                                                                Submit Application
                                                            </>
                                                        )}
                                                    </Button>

                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default VendorApp;
