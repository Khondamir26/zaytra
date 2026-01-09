import { VendorFormData } from "@/types/vendor";

export function validateVendorForm(data: VendorFormData) {
  const errors: Partial<Record<keyof VendorFormData, string>> = {};

  if (!data.legalCompanyName?.trim()) errors.legalCompanyName = "Required";
  if (!data.brandName?.trim()) errors.brandName = "Required";
  if (!data.website?.startsWith("http")) errors.website = "Invalid URL";
  if (!data.contactEmail?.includes("@")) errors.contactEmail = "Invalid email";
  if (!data.productCategory?.length) errors.productCategory = "Choose at least one";
  if (!data.productDescription?.trim()) errors.productDescription = "Required";
  if (!data.agreeToTerms) errors.agreeToTerms = "You must agree";

  // и т.д. (можно дополнять)

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
