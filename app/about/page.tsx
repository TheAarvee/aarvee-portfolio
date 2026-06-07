import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import aboutImg from "../assets/about-img.png";
import posterImg from "../assets/Poster.png";
import AkaSticker from "@/components/akaSticker";
import VinylPlayer from "@/components/VinylPlayer";
import { Splash } from "next/font/google";
import RecentBlogs from "@/components/RecentBlogs";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F4F4F2] pt-40 md:pt-40 px-8 pb-36 md:pr-24 md:pb-44 md:pl-12 lg:pl-16 relative overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col items-start mx-auto xl:mx-0">
          <h1 className="relative text-4xl md:text-5xl font-semibold text-black tracking-tight font-[family-name:var(--font-familjen-grotesk)] mb-8 inline-flex">
            Hi, I&apos;m Ravivarman
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={48}
              height={48}
              className="absolute right-1 md:-right-15 top-1/2 -translate-y-1/2 w-8 h-8 md:w-15 md:h-15 object-contain rotate-12 z-10 transition-transform duration-300 hover:rotate-2"
              unoptimized
            />
          </h1>
          <div className="flex flex-col lg:flex-row w-full items-center relative">
            <div className="relative w-full lg:w-[700px] aspect-[16/9] shrink-0 z-20">
              <AkaSticker 
                bgColor="#0648ff" 
                textColor="#000000" 
                className="absolute -top-4 right-8 md:right-25 rotate-12 z-30"
              />
              <Image
                src={aboutImg}
                alt="About Ravivarman"
                fill
                className="object-cover object-top rounded-3xl relative z-20"
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
            
            <div className="w-full lg:flex-1 shrink-0 mt-12 lg:mt-0 z-10 flex items-center justify-center lg:justify-start">
              <VinylPlayer />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-20 relative justify-between">
            <div className="mt-12 md:mt-8 w-full max-w-[750px] flex flex-col gap-5 text-black font-[family-name:var(--font-geist-sans)] font-light text-[1.1rem] leading-relaxed text-justify pb-20">
              <p>
                <span className="font-semibold">I build things on the internet </span> because my brain genuinely refuses to stay calm unless I&apos;m creating something.
            </p>
            <p>
              Most days, I&apos;m either designing a product, breaking one while coding, fixing that same bug after 3 hours, or randomly thinking about <span className="font-semibold">startup ideas at 2AM </span> like they&apos;ll change the world by morning.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-black font-[family-name:var(--font-familjen-grotesk)] mt-6 mb-1 text-left">
              Where it started
            </h2>
            <p>
              I started this journey with a simple idea called <Link href="https://newthing.co.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0648ff] hover:text-[#0648ff]/80 transition-colors underline cursor-pointer">NewThing</Link>.
            </p>
            <p>
              It wasn&apos;t some huge startup with funding, hype, or a fancy team. It was just me trying to build something real from scratch while figuring out life, tech, and myself at the same time.
            </p>
            <p>
              That phase changed a lot for me.
            </p>
            <p>
              I went from casually exploring ideas to actually shipping products, learning design, understanding users, staying up late solving bugs, rebuilding things again and again, and realizing that <span className="font-semibold">building is way harder and way more fun than people make it look online.</span>
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-black font-[family-name:var(--font-familjen-grotesk)] mt-6 mb-1 text-left">
              What I build
            </h2>
            <p>
              Since then, I&apos;ve been building projects around AI, productivity, creators, and future-focused systems.
            </p>
            <p>
              I love turning messy ideas into products people can actually use.
            </p>
            <p>
              Some of the projects I&apos;ve worked on include <span className="font-semibold">OneDrop</span>, an one-time file sharing system, and ideas like <span className="font-semibold">Agent0</span>, where AI agents work like an actual startup team instead of just chatbots.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-black font-[family-name:var(--font-familjen-grotesk)] mt-6 mb-1 text-left">
              What interests me
            </h2>
            <p>
              I&apos;m deeply interested in how humans and AI will work together in the future, not just as tools, but almost like teammates.
            </p>
            <p>
              A lot of my projects and thoughts revolve around that direction.
            </p>
            <p>
              I care a lot about good design, clean experiences, storytelling, and building things that feel human instead of products that just &quot;look startup-ish.&quot;
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-black font-[family-name:var(--font-familjen-grotesk)] mt-6 mb-1 text-left">
              Real life stuff
            </h2>
            <p>
              I&apos;m not the <span className="font-semibold">&quot;perfect productivity&quot;</span> guy.
            </p>
            <p className="text-left">
              Some days are super focused.<br />
              Some days are just me staring at code wondering who wrote this mess.<br />
              (Usually me.)
            </p>
            <p>
              Outside of tech, I&apos;m into cinematic content, deep conversations, music, observing people, and overthinking the future a little too much.
            </p>

            <p className="text-left">
              Still learning. Still building.
              <br/>
              Probably rebuilding something right now!
            </p>
            </div>
            
            <div className="w-full lg:w-[320px] xl:w-[420px] shrink-0 mt-12 md:mt-14 flex flex-col gap-15">
              <RecentBlogs />
              <div className="w-full">
                <Image
                  src={posterImg}
                  alt="Poster"
                  className="w-full h-auto rounded-3xl shadow-sm border border-black/5"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
