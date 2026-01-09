export interface VendorFormData {
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
  productFile?: File;
  productVideoLink: string;
  pitchDeck?: File;
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
  caseStudiesFile?: File;
  caseStudiesLink: string;
  testimonialsFile?: File;
  testimonialsLink: string;
  certifications?: File;
  pressLinks: string;
  extraInfo: string;
  submitterName: string;
  submitterPosition: string;
  agreeToTerms: boolean;
  agreeToContact: boolean;
  submissionDate: string;
}
export interface VendorApiResponse {
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