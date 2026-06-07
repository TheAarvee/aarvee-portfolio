import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

export interface Project {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  thumbnail?: SanityImageSource;
  thumbnailAlt?: string;
  tags?: string[];
  year?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Education {
  _id: string;
  schoolName: string;
  schoolLogo?: SanityImageSource;
  schoolLogoAlt?: string;
  degree: string;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  organizationName: string;
  organizationLogo?: SanityImageSource;
  organizationLogoAlt?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
}

export interface TechStack {
  _id: string;
  name: string;
  logo?: SanityImageSource;
  logoAlt?: string;
}

export interface Certification {
  _id: string;
  title: string;
  organizationName: string;
  organizationLogo?: SanityImageSource;
  organizationLogoAlt?: string;
  issuedOn?: string;
  credentialUrl?: string;
}

export interface ResumeData {
  education: Education[];
  experience: Experience[];
  techStack: TechStack[];
  certifications: Certification[];
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-07";

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const imageBuilder = sanityConfigured
  ? createImageUrlBuilder({ projectId: projectId!, dataset })
  : null;

export function urlForImage(source: SanityImageSource) {
  if (!imageBuilder) {
    return null;
  }

  return imageBuilder.image(source);
}

const projectsQuery = `*[_type == "project"] | order(coalesce(order, 999) asc, coalesce(year, "0000") desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  thumbnail,
  "thumbnailAlt": coalesce(thumbnail.alt, title),
  tags,
  year,
  liveUrl,
  repoUrl,
  featured
}`;

export async function getProjects(): Promise<Project[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<Project[]>(projectsQuery);
}

const resumeQuery = `{
  "education": *[_type == "education"] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    schoolName,
    schoolLogo,
    "schoolLogoAlt": coalesce(schoolLogo.alt, schoolName),
    degree,
    startDate,
    endDate
  },
  "experience": *[_type == "experience"] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    jobTitle,
    organizationName,
    organizationLogo,
    "organizationLogoAlt": coalesce(organizationLogo.alt, organizationName),
    employmentType,
    startDate,
    endDate,
    duration
  },
  "techStack": *[_type == "techStack"] | order(coalesce(order, 999) asc, name asc) {
    _id,
    name,
    logo,
    "logoAlt": coalesce(logo.alt, name)
  },
  "certifications": *[_type == "certification"] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    title,
    organizationName,
    organizationLogo,
    "organizationLogoAlt": coalesce(organizationLogo.alt, organizationName),
    issuedOn,
    credentialUrl
  }
}`;

export async function getResumeData(): Promise<ResumeData> {
  if (!sanityClient) {
    return {
      education: [],
      experience: [],
      techStack: [],
      certifications: [],
    };
  }

  return sanityClient.fetch<ResumeData>(resumeQuery);
}
