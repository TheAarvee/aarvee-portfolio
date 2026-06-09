import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  getResumeData,
  sanityConfigured,
  urlForImage,
  type Certification,
  type Education,
  type Experience,
  type TechStack,
} from "@/lib/sanity";
import personImage from "../assets/person.png";

export const revalidate = 300;

const resumeDownloadUrl =
  "https://drive.google.com/file/d/10_XkVPqNJ6MZHLHAgHoVuUS9dbW2UCrH/view?usp=sharing";

function logoUrl(source?: Parameters<typeof urlForImage>[0]) {
  if (!source) {
    return null;
  }

  return (
    urlForImage(source)
      ?.width(220)
      .height(220)
      .fit("max")
      .ignoreImageParams()
      .auto("format")
      .quality(90)
      .url() || null
  );
}

function dateRange(startDate?: string, endDate?: string) {
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate || "";
}

function LogoBox({
  src,
  alt,
  fallback,
}: {
  src: string | null;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center bg-transparent">
      {src ? (
        <Image src={src} alt={alt} fill sizes="64px" className="object-contain rounded-md" />
      ) : (
        <span className="font-[family-name:var(--font-familjen-grotesk)] text-xl font-semibold text-black/50">
          {fallback.slice(0, 1)}
        </span>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <div className="mb-3">
        <h2 className="font-[family-name:var(--font-geist-sans)] text-lg tracking-tight text-black/70 md:text-xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function EducationRow({ item }: { item: Education }) {
  const logo = logoUrl(item.schoolLogo);

  return (
    <div className="flex gap-4 py-6">
      <LogoBox src={logo} alt={item.schoolLogoAlt || item.schoolName} fallback={item.schoolName} />
      <div className="min-w-0 flex-1">
        <h3 className="font-[family-name:var(--font-familjen-grotesk)] text-2xl font-semibold leading-tight text-black">
          {item.schoolName}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-geist-sans)] text-sm text-black/70">
          {item.degree}
        </p>
        {dateRange(item.startDate, item.endDate) && (
          <p className="mt-2 font-[family-name:var(--font-geist-sans)] text-xs text-black/40">
            {dateRange(item.startDate, item.endDate)}
          </p>
        )}
      </div>
    </div>
  );
}

function ExperienceRow({ item }: { item: Experience }) {
  const logo = logoUrl(item.organizationLogo);

  return (
    <div className="flex gap-4 py-6">
      <LogoBox
        src={logo}
        alt={item.organizationLogoAlt || item.organizationName}
        fallback={item.organizationName}
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-[family-name:var(--font-familjen-grotesk)] text-2xl font-semibold leading-tight text-black">
          {item.jobTitle}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-geist-sans)] text-sm text-black/70">
          {item.organizationName}
          {item.employmentType ? ` - ${item.employmentType}` : ""}
        </p>
        {(dateRange(item.startDate, item.endDate) || item.duration) && (
          <p className="mt-2 font-[family-name:var(--font-geist-sans)] text-xs text-black/40">
            {[dateRange(item.startDate, item.endDate), item.duration].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

function TechStackCard({ item }: { item: TechStack }) {
  const logo = logoUrl(item.logo);

  return (
    <div className="flex aspect-square w-full items-center justify-center">
      <div className="relative h-14 w-14 overflow-hidden rounded-md">
        {logo ? (
          <Image src={logo} alt={item.logoAlt || item.name} fill sizes="56px" className="object-contain" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center bg-black text-white">
            {item.name.slice(0, 1)}
          </div>
        )}
      </div>
    </div>
  );
}

function CertificationRow({ item }: { item: Certification }) {
  const logo = logoUrl(item.organizationLogo);

  return (
    <div className="flex gap-4 py-6">
      <LogoBox
        src={logo}
        alt={item.organizationLogoAlt || item.organizationName}
        fallback={item.organizationName}
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-[family-name:var(--font-familjen-grotesk)] text-2xl font-semibold leading-tight text-black">
          {item.title}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-geist-sans)] text-sm text-black/70">
          {item.organizationName}
        </p>
        {item.issuedOn && (
          <p className="mt-2 font-[family-name:var(--font-geist-sans)] text-xs text-black/40">
            Issued {item.issuedOn}
          </p>
        )}
        {item.credentialUrl && (
          <Link
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 font-[family-name:var(--font-geist-sans)] text-xs font-semibold text-black transition-colors hover:bg-black hover:text-white"
          >
            Show credential
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[280px] w-full items-center justify-center rounded-3xl border border-dashed border-black/15 bg-white/35 px-6 text-center">
      <div className="max-w-xl">
        <h2 className="mb-3 font-[family-name:var(--font-familjen-grotesk)] text-3xl font-semibold text-black">
          {sanityConfigured ? "No resume entries yet" : "Connect Sanity to show resume"}
        </h2>
        <p className="font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-black/55">
          {sanityConfigured
            ? "Add education, experience, tech stack, and certification documents in Sanity Studio."
            : "Add your Sanity environment variables, then create resume documents in Studio."}
        </p>
      </div>
    </div>
  );
}

export default async function Resume() {
  const { education, experience, techStack, certifications } = await getResumeData();
  const hasContent =
    education.length > 0 ||
    experience.length > 0 ||
    techStack.length > 0 ||
    certifications.length > 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F4F2] px-8 pb-36 pt-35 md:pb-44 md:pl-12 md:pr-24 lg:pl-16">
        <section className="mx-auto flex w-full max-w-7xl flex-col items-start xl:mx-0">
          <div className="mb-16 flex w-full flex-col items-start gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black">
              [RESUME]
            </p>
            <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <h1 className="flex flex-wrap items-center gap-x-3 font-[family-name:var(--font-familjen-grotesk)] text-4xl font-semibold tracking-tight text-black md:text-5xl">
                <span>The stuff</span>
                <Image
                  src={personImage}
                  alt=""
                  className="inline-block h-[1.05em] w-auto object-contain rotate-10"
                  placeholder="blur"
                  aria-hidden="true"
                />
                <span>I know</span>
              </h1>
              <Link
                href={resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black px-5 py-3 font-[family-name:var(--font-geist-sans)] text-xs font-semibold uppercase tracking-[0.08em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                Download resume
                <ArrowDownToLine className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {hasContent ? (
            <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-30">
              <div className="flex flex-col gap-14">
                {education.length > 0 && (
                  <Section title="Education">
                    <div className="w-full">{education.map((item) => <EducationRow key={item._id} item={item} />)}</div>
                  </Section>
                )}

                {experience.length > 0 && (
                  <Section title="Experience">
                    <div className="w-full">{experience.map((item) => <ExperienceRow key={item._id} item={item} />)}</div>
                  </Section>
                )}
              </div>

              <div className="flex flex-col gap-14">
                {techStack.length > 0 && (
                  <Section title="Tech stack">
                    <div className="mt-8 grid grid-cols-[repeat(auto-fit,56px)] gap-6">
                      {techStack.map((item) => (
                        <TechStackCard key={item._id} item={item} />
                      ))}
                    </div>
                  </Section>
                )}

                {certifications.length > 0 && (
                  <Section title="Licenses & certifications">
                    <div className="w-full">
                      {certifications.map((item) => (
                        <CertificationRow key={item._id} item={item} />
                      ))}
                    </div>
                  </Section>
                )}
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </>
  );
}
