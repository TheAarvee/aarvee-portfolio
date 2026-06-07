import Image from "next/image";
import { Globe } from "lucide-react";
import heroImage from "./assets/hero.png";
import excImage from "./assets/exc.png";
import cursorImage from "./assets/cursor.png";
import lineImage from "./assets/Lineimg.png";
import graphImage from "./assets/Graph.png";
import Navbar from "../components/Navbar";
import AkaSticker from "../components/akaSticker";
import SiteLoader from "../components/SiteLoader";
import Typewriter from "../components/Typewriter";
import RecentBlogs from "../components/RecentBlogs";

export default function Home() {
  return (
    <SiteLoader>
      <Navbar />
      <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={heroImage}
        alt="Hero background"
        fill
        priority
        placeholder="blur"
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 z-0">
        <Image
          src={excImage}
          alt="Exclamation mark"
          width={100}
          height={100}
          className="absolute right-[15%] md:right-[39%] top-[40%] md:top-[28%] rotate-12 select-none pointer-events-none"
        />
      </div>
      <div className="absolute inset-0 flex items-end justify-between p-6 md:p-12 text-black z-10">
        <h1
          className="relative font-[family-name:var(--font-familjen-grotesk)] font-bold tracking-tight text-4xl md:text-6xl leading-[0.85]"
        >
          Hi, I&apos;m
          <br />
          <span className="relative inline-block">
            Ravivarman
            <AkaSticker />
          </span>
        </h1>
        <div>
        <p className="font-[family-name:var(--font-geist-sans)] font-semibold text-black/45 mb-2">FOUNDER • SOFTWARE DEVELOPER • DESIGNER</p>
        <p className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-4xl text-right leading-tighter">
          I love <span className="text-[#0037FF] italic">building</span> things
          <br />
          <span className="relative inline-block">
            <Image
              src={cursorImage}
              alt="Cursor"
              width={32}
              height={32}
              className="absolute -left-6 top-1 md:-left-8 md:top-2 w-auto h-5 md:h-8 select-none rotate-42 transition-transform hover:scale-125"
            />
            on
          </span>{" "}
          the internet
        </p>
        </div>
      </div>
      </section>
      <section className="w-full bg-black text-white py-12 md:py-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-8 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="relative w-full max-w-[360px] md:max-w-[420px]">
            <Image
              src={lineImage}
              alt="Portrait note"
              className="h-auto w-full object-contain"
              placeholder="blur"
              sizes="(max-width: 768px) 80vw, 420px"
            />
          </div>
          <div className="w-full md:flex-1">
            <p className="font-[family-name:var(--font-familjen-grotesk)] text-2xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-tight">
              <Typewriter text="I wanna see what happens" speed={50} />
              <br />
              <Typewriter text="if i don't give up." className="text-[#FF2200]" speed={50} delay={1200} />
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-black text-white py-8 md:py-24 flex flex-col items-center justify-center">
        <h2 className="font-[family-name:var(--font-dotgothic)] text-2xl md:text-5xl mb-12 tracking-wide font-normal">
          The Skillset Breakdown
        </h2>
        <div className="relative w-full max-w-3xl px-8 flex justify-center">
          <Image
            src={graphImage}
            alt="Skillset breakdown graph"
            className="w-full h-auto object-contain"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </section>      <section className="w-full bg-black text-white pt-16 pb-36 md:pt-24 md:pb-44 border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-8">
          <RecentBlogs theme="dark" size="large" />
        </div>
      </section>    </SiteLoader>
  );
}
