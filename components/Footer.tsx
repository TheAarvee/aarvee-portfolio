import Image from "next/image";
import Link from "next/link";
import footerImage from "@/app/assets/Footer.png";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Blog", href: "/blog" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ravivarmanb/",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8h4.2v13H.4V8Zm7.1 0h4.03v1.78h.06c.56-1.06 1.94-2.18 3.99-2.18 4.27 0 5.06 2.81 5.06 6.47V21h-4.2v-6.15c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V21H7.5V8Z" />
    ),
    viewBox: "0 0 21 22",
  },
  {
    label: "Mail",
    href: "mailto:ravivarmanb05@gmail.com",
    icon: (
      <path d="M2.4 4h19.2A2.4 2.4 0 0 1 24 6.4v11.2a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 17.6V6.4A2.4 2.4 0 0 1 2.4 4Zm9.6 8.7L2.9 6H2.4a.4.4 0 0 0-.4.4v.45l10 7.35L22 6.85V6.4a.4.4 0 0 0-.4-.4h-.5L12 12.7Z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "GitHub",
    href: "https://github.com/TheAarvee",
    icon: (
      <path d="M12 1.6C6.24 1.6 1.6 6.35 1.6 12.23c0 4.7 2.98 8.68 7.11 10.1.52.1.71-.23.71-.52v-1.97c-2.89.64-3.5-1.26-3.5-1.26-.47-1.23-1.15-1.56-1.15-1.56-.95-.66.07-.65.07-.65 1.04.07 1.59 1.1 1.59 1.1.94 1.62 2.44 1.15 3.04.88.09-.69.36-1.15.66-1.42-2.31-.27-4.74-1.18-4.74-5.26 0-1.16.41-2.11 1.07-2.85-.1-.27-.47-1.35.1-2.82 0 0 .88-.29 2.86 1.09A9.65 9.65 0 0 1 12 6.74c.88 0 1.77.12 2.6.35 1.97-1.38 2.85-1.09 2.85-1.09.57 1.47.2 2.55.1 2.82.66.74 1.07 1.69 1.07 2.85 0 4.1-2.44 4.99-4.75 5.25.37.33.71.98.71 1.97v2.92c0 .29.19.62.72.52a10.49 10.49 0 0 0 7.1-10.1C22.4 6.35 17.76 1.6 12 1.6Z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/TheAarvee",
    icon: (
      <path d="M13.483 0a1.374 1.374 0 0 0-0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063-0.074l2.396-2.392c0.54-0.54 0.54-1.414 0.003-1.955a1.378 1.378 0 0 0-1.951-0.003l-2.396 2.392a3.021 3.021 0 0 1-4.205 0.038l-0.02-0.019-4.276-4.193c-0.652-0.64-0.972-1.469-0.948-2.263a2.68 2.68 0 0 1 0.066-0.523 2.545 2.545 0 0 1 0.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94-0.207a1.384 1.384 0 0 0-0.207-1.943l-3.5-2.831c-0.8-0.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    ),
    viewBox: "0 0 24 24",
  },
];

export default function Footer() {
  return (
    <footer className="relative min-h-[260px] overflow-hidden bg-[#F4F4F2] px-8 pt-10 md:min-h-[320px] md:px-14 md:pt-12 lg:px-16">
      <Image
        src={footerImage}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover object-bottom"
        placeholder="blur"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-18">
          <Link href="/" aria-label="Home" className="font-plank text-4xl leading-none text-black">
            rv
          </Link>

          <nav aria-label="Footer links" className="flex flex-wrap gap-x-9 gap-y-3 pt-1 font-[family-name:var(--font-geist-sans)] text-sm text-black">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <p className="font-[family-name:var(--font-dotgothic)] text-base tracking-wide text-black/55 md:text-lg">
            {"Copyright \u00A9 2026 Aarvee"}
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="text-black/70 transition-colors hover:text-black"
              >
                <svg
                  viewBox={social.viewBox}
                  aria-hidden="true"
                  className="h-5.5 w-5.5 fill-current md:h-6 md:w-6"
                >
                  {social.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
