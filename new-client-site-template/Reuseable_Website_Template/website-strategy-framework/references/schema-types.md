# Schema Types Reference

Structured data for local service businesses. Current as of September 2026.

## Principle

Use the **most specific correct type**. An incorrect primary category is one of
the most damaging local SEO mistakes.

## Core types for local businesses

### LocalBusiness and subtypes

```json
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": "https://example.com/#business",
  "name": "Business Name",
  "url": "https://example.com",
  "telephone": "+64-9-000-0000",
  "priceRange": "$$",
  "image": "https://example.com/img/premises.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Example Street",
    "addressLocality": "Auckland",
    "addressRegion": "Auckland",
    "postalCode": "1010",
    "addressCountry": "NZ"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "-36.8485", "longitude": "174.7633" },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00", "closes": "17:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "Auckland",
      "sameAs": "https://en.wikipedia.org/wiki/Auckland" }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/...",
    "https://www.facebook.com/..."
  ]
}
```

Common subtypes: `Plumber`, `Electrician`, `HVACBusiness`, `RoofingContractor`,
`GeneralContractor`, `HousePainter`, `Locksmith`, `MovingCompany`,
`LegalService`, `Dentist`, `MedicalClinic`, `AutoRepair`, `AutoDealer`,
`RealEstateAgent`, `Restaurant`.

Legacy types `HomeAndConstructionBusiness`, `ProfessionalService` and
`Attorney` are **not** valid specific types — `Attorney` is deprecated; use
`LegalService`.

### Service (one per service page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Marine Electrical Inspection",
  "serviceType": "Marine electrical inspection",
  "provider": { "@id": "https://example.com/#business" },
  "areaServed": { "@type": "City", "name": "Auckland" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Marine electrical services",
    "itemListElement": [
      { "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Battery system installation" } }
    ]
  }
}
```

### ProfilePage + Person (team / author pages)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Jane Smith",
    "jobTitle": "Master Electrician",
    "worksFor": { "@id": "https://example.com/#business" },
    "hasCredential": "NZ Registered Electrician",
    "sameAs": ["https://www.linkedin.com/in/..."]
  }
}
```

## Multi-location pattern

Homepage carries the `Organization`; each location page carries its own
`LocalBusiness` with `branchOf`.

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://example.com/service-areas/downtown/#location",
  "name": "Business Name - Downtown",
  "branchOf": { "@id": "https://example.com/#business" },
  "address": { ... },
  "telephone": "+64-9-000-0001"
}
```

Use `/service-areas/city/` subdirectories, not subdomains — subdirectories
consolidate authority better.

## FAQPage — retired rich results

| Type | SERP status | Since |
|---|---|---|
| FAQPage | Rich results fully retired — no SERP feature for any site | **7 May 2026** |

- **Existing FAQPage:** flag at **Info** priority, not Critical. Do not
  recommend removal solely because rich results retired.
- **New FAQPage:** no Google SERP benefit. Do not recommend it for that reason.
- **Genuine single-question pages** where users submit answers: use **QAPage**.
- Do not claim FAQPage improves AI/LLM citation.

## Deprecated — never recommend

| Type | Status | Since |
|---|---|---|
| HowTo | Rich results removed | September 2023 |
| SpecialAnnouncement | Deprecated | 31 July 2025 |
| CourseInfo | Retired from rich results | June 2025 |
| EstimatedSalary | Retired from rich results | June 2025 |
| LearningVideo | Retired from rich results | June 2025 |
| ClaimReview | Retired from rich results | June 2025 |
| VehicleListing | Retired from rich results | 12 June 2025 |
| Book Actions | Deprecated | June 2025 |
| Practice Problem | Retired from rich results | Nov 2025 notice |

`Dataset` is **not** discontinued — it is used by Dataset Search, just not by
Google Search rich results.

## Validation checklist

1. `@context` is `"https://schema.org"` (https, not http)
2. `@type` is valid and not deprecated
3. All required properties present
4. Property values match expected types
5. No placeholder text (e.g. "[Business Name]")
6. URLs are absolute, not relative
7. Dates are ISO 8601
8. Images have valid URLs

Tools: [Rich Results Test](https://search.google.com/test/rich-results) ·
[Schema.org Validator](https://validator.schema.org/)

Note: for CourseInfo, EstimatedSalary, LearningVideo, SpecialAnnouncement and
VehicleListing, Search Console / Rich Results Test support was removed in
January 2026 — do not tell users to validate those there.
