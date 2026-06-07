import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getProjects, sanityConfigured, urlForImage, type Project } from "@/lib/sanity";
import timerImage from "../assets/Timer.png";

export const revalidate = 300;

function ProjectCard({ project }: { project: Project }) {
  const thumbnailUrl = project.thumbnail
    ? urlForImage(project.thumbnail)
        ?.width(900)
        .height(620)
        .fit("crop")
        .auto("format")
        .quality(88)
        .url()
    : null;

  return (
    <article className="group flex h-full flex-col gap-5">
      {project.liveUrl ? (
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="relative block aspect-[1.35] w-full overflow-hidden rounded-3xl bg-black/5 shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
        >
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={project.thumbnailAlt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#111] p-6 text-white">
              <span className="font-[family-name:var(--font-familjen-grotesk)] text-3xl font-semibold leading-none">
                {project.title}
              </span>
            </div>
          )}
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-[#DEF346] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.10em] text-black shadow-sm">
              Featured
            </span>
          )}
        </Link>
      ) : (
        <div className="relative aspect-[1.35] w-full overflow-hidden rounded-3xl bg-black/5 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={project.thumbnailAlt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#111] p-6 text-white">
              <span className="font-[family-name:var(--font-familjen-grotesk)] text-3xl font-semibold leading-none">
                {project.title}
              </span>
            </div>
          )}
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-[#DEF346] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.10em] text-black shadow-sm">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="mx-1 flex flex-1 flex-col">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {project.year && (
              <p className="mb-1 font-[family-name:var(--font-geist-sans)] text-xs font-medium text-black/40">
                {project.year}
              </p>
            )}
            <h2 className="font-[family-name:var(--font-familjen-grotesk)] text-2xl font-semibold leading-tight tracking-tight text-black md:text-3xl">
              {project.title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} repository`}
                className="inline-flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5.5 w-5.5 fill-current"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.75 1.05A9.28 9.28 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.5A10.09 10.09 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                </svg>
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="inline-flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:text-black"
              >
                <ArrowUpRight className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>

        {project.excerpt && (
          <p className="mb-5 line-clamp-3 font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-black/60">
            {project.excerpt}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-3 py-1 font-[family-name:var(--font-geist-sans)] text-[11px] font-medium text-black/55"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F4F2] px-8 pb-36 pt-35 md:pb-44 md:pl-12 md:pr-24 lg:pl-16">
        <section className="mx-auto flex w-full max-w-7xl flex-col items-start xl:mx-0">
          <div className="mb-12 flex w-full flex-col items-start gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black">
                [PROJECTS]
              </p>
              <h1 className="flex flex-wrap items-center gap-x-3 font-[family-name:var(--font-familjen-grotesk)] text-4xl font-semibold tracking-tight text-black md:text-5xl">
                <span>My</span>
                <Image
                  src={timerImage}
                  alt="2:00"
                  className="inline-block h-[1.10em] w-auto object-contain rounded-md -rotate-6 shadow-[0px_6px_18px_rgba(0,0,0,0.25)]"
                  placeholder="blur"
                />
                <span>AM ideas</span>
              </h1>
          </div>

          {projects.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] w-full items-center justify-center rounded-3xl border border-dashed border-black/15 bg-white/35 px-6 text-center">
              <div className="max-w-xl">
                <h2 className="mb-3 font-[family-name:var(--font-familjen-grotesk)] text-3xl font-semibold text-black">
                  {sanityConfigured ? "No projects published yet" : "Connect Sanity to show projects"}
                </h2>
                {/* <p className="font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-black/55">
                  {sanityConfigured
                    ? "Create project documents in Sanity and they will appear here as thumbnail cards."
                    : "Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to your environment, then create project documents in Sanity."}
                </p> */}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
