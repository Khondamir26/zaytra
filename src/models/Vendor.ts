import mongoose, { Document, Schema } from 'mongoose';

export interface IVendor extends Document {
  legalCompanyName: string;
  brandName: string;
  country: string;
  website?: string;
  yearFounded?: string;
  employees?: string;
  itParkResident?: string;
  contactName: string;
  contactTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  linkedin?: string;
  productName: string;
  productPitch?: string;
  productCategory: string[];
  productDescription?: string;
  targetIndustries?: string[];
  supportedLanguages?: string[];
  pricingModel?: string[];
  startingPrice?: string;
  isLive?: string;
  liveLink?: string;
  productVideo?: string;
  productFile?: string;
  productVideoLink?: string;
  pitchDeck?: string;
  hasApiOrSdk?: string;
  integrationMethods?: string[];
  modularCompatible?: string;
  modularFeaturesDescription?: string;
  apiDocsLink?: string;
  hasSandbox?: string;
  leadResponseTime?: string;
  listingPlan?: string;
  acceptedCommission?: string;
  customCommission?: string;
  needsLegalEntityPerDeal?: string;
  localizedSupport?: string;
  preferredMarkets?: string[];
  caseStudiesVideo?: string;
  caseStudiesFile?: string;
  caseStudiesLink?: string;
  testimonialsFile?: string;
  testimonialsLink?: string;
  certifications?: string;
  pressLinks?: string;
  extraInfo?: string;
  submitterName: string;
  submitterPosition?: string;
  agreeToTerms: boolean;
  agreeToContact: boolean;
  submissionDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema = new Schema<IVendor>(
  {
    legalCompanyName: { type: String, required: true },
    brandName: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String },
    yearFounded: { type: String },
    employees: { type: String },
    itParkResident: { type: String },
    contactName: { type: String, required: true },
    contactTitle: { type: String },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    linkedin: { type: String },
    productName: { type: String, required: true },
    productPitch: { type: String },
    productCategory: [{ type: String }],
    productDescription: { type: String },
    targetIndustries: [{ type: String }],
    supportedLanguages: [{ type: String }],
    pricingModel: [{ type: String }],
    startingPrice: { type: String },
    isLive: { type: String },
    liveLink: { type: String },
    productVideo: { type: String },
    productFile: { type: String },
    productVideoLink: { type: String },
    pitchDeck: { type: String },
    hasApiOrSdk: { type: String },
    integrationMethods: [{ type: String }],
    modularCompatible: { type: String },
    modularFeaturesDescription: { type: String },
    apiDocsLink: { type: String },
    hasSandbox: { type: String },
    leadResponseTime: { type: String },
    listingPlan: { type: String },
    acceptedCommission: { type: String },
    customCommission: { type: String },
    needsLegalEntityPerDeal: { type: String },
    localizedSupport: { type: String },
    preferredMarkets: [{ type: String }],
    caseStudiesVideo: { type: String },
    caseStudiesFile: { type: String },
    caseStudiesLink: { type: String },
    testimonialsFile: { type: String },
    testimonialsLink: { type: String },
    certifications: { type: String },
    pressLinks: { type: String },
    extraInfo: { type: String },
    submitterName: { type: String, required: true },
    submitterPosition: { type: String },
    agreeToTerms: { type: Boolean, required: true },
    agreeToContact: { type: Boolean, required: true },
    submissionDate: { type: String },
  },
  { timestamps: true, collection: 'vendors' }
);

// Prevent re-compilation
export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);
