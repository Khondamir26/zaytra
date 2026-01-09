"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function VendorApplicationPage() {
  const [currentSection, setCurrentSection] = useState(0); // 👈 Start at 0 if you're indexing from 0

  return (
    <div className="text-center mt-16">
      <div className="mb-10 flex justify-center">
        <PaginationDemo
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </div>

      {/* 👇 You can use currentSection to render the appropriate section content */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Current Section: {currentSection + 1}</h2>
        {/* Example: You can conditionally render forms based on currentSection */}
      </div>
    </div>
  );
}

export default VendorApplicationPage;

// --------------------------

export function PaginationDemo({
  currentSection,
  setCurrentSection,
}: {
  currentSection: number;
  setCurrentSection: (page: number) => void;
}) {
  const totalSections = 6;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentSection > 0) {
                setCurrentSection(currentSection - 1);
              }
            }}
          />
        </PaginationItem>

        {[...Array(totalSections)].map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              href="#"
              isActive={currentSection === idx}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection(idx);
              }}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 👇 Only show "Next" if not on last section */}
        {currentSection < totalSections - 1 && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection(currentSection + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

