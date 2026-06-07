"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import mediumIcon from "../assets/medium_icon.png";
import parse from "html-react-parser";
import { DotmSquare15 } from "@/components/ui/dotm-square-15";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  "content:encoded": string;
  creator: string;
  guid: string;
  categories: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/medium");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort posts by date (newest first)
          const sortedPosts = data.sort((a, b) => {
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          });
          setPosts(sortedPosts);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper to extract first image from content
  const extractImage = (content: string) => {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  // Helper to safely extract description text without squishing words together
  const extractDescription = (content: string) => {
    // Medium RSS puts the whole article in content:encoded.
    // We'll extract only the very first text block (like a subtitle or first paragraph) 
    // to use as the short description snippet.
    const blocks = content.match(/<(p|h[1-6]|blockquote)[^>]*>(.*?)<\/\1>/gi);
    
    if (blocks && blocks.length > 0) {
      for (const block of blocks) {
        const text = block.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        // Return the first block that actually has text
        if (text.length > 0) {
          return text;
        }
      }
    }

    // Fallback
    let text = content.replace(/<\/(p|h1|h2|h3|h4|h5|h6|div|figure|li|ul|ol|blockquote)>/gi, ' ');
    text = text.replace(/<[^>]+>/g, ' ');
    return text.replace(/\s+/g, ' ').trim();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F4F4F2] pt-40 md:pt-40 px-8 md:pr-24 md:pl-12 lg:pl-16 pb-36 md:pb-44 relative">
        <h1 className="relative text-4xl md:text-5xl font-semibold text-black tracking-tight font-[family-name:var(--font-familjen-grotesk)] mb-12 -mt-6 inline-flex">
          My Blog
          <Link 
            href="https://medium.com/@ravivarmanb05" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute -right-12 md:-right-16 top-8 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rotate-12 z-10 transition-transform duration-300 hover:rotate-2 block cursor-pointer"
          >
            <Image
              src={mediumIcon}
              alt="Medium Icon"
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.65)] pointer-events-none" />
          </Link>
        </h1>

        <div className="w-full flex flex-col items-start">
          {loading ? (
            <div className="flex justify-center items-center py-20 w-full max-w-7xl">
              <DotmSquare15 size={48} dotSize={6} color="black" />
            </div>
          ) : posts.length > 0 ? (
            <div className="w-full max-w-7xl flex flex-col gap-12">
              {/* Featured Post (Most Recent) */}
              {(() => {
                const featuredPost = posts[0];
                const img = extractImage(featuredPost["content:encoded"]);
                return (
                  <Link 
                    href={featuredPost.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-zinc-900 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex w-full h-[400px] md:h-[500px]"
                  >
                    {img && (
                      <>
                        <img 
                          src={img} 
                          alt={featuredPost.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      </>
                    )}
                    {!img && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-zinc-800 to-zinc-900"></div>
                    )}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 flex flex-col w-full md:w-4/5 lg:w-3/4 z-10">
                      <div className="text-xs md:text-sm font-medium text-white/90 mb-3 flex items-center gap-2 flex-wrap drop-shadow-md">
                        {new Date(featuredPost.pubDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        {featuredPost.categories && featuredPost.categories.length > 0 && (
                          <>
                            <span className="text-white/50">•</span>
                            <span className="text-white/70 uppercase tracking-wider text-[10px] md:text-xs">{featuredPost.categories[0]}</span>
                          </>
                        )}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 font-[family-name:var(--font-familjen-grotesk)] leading-tight drop-shadow-md">
                        {featuredPost.title}
                      </h2>
                      <div className="text-white/80 text-sm md:text-base line-clamp-3 md:line-clamp-4 font-[family-name:var(--font-geist-sans)] drop-shadow-md">
                        {extractDescription(featuredPost["content:encoded"])}
                      </div>
                    </div>
                  </Link>
                );
              })()}

              <h1 className="relative text-2xl md:text-4xl font-regular text-black tracking-tight font-[family-name:var(--font-familjen-grotesk)] inline-flex -mb-4 mt-2">
                Recents
              </h1>
              {/* Remaining Posts Grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => {
                    const img = extractImage(post["content:encoded"]);
                    return (
                      <Link 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        key={post.guid}
                        className="group flex flex-col gap-5"
                      >
                        {img && (
                          <div className="w-full h-56 md:h-64 relative overflow-hidden rounded-3xl bg-black/5 shrink-0">
                            <img 
                              src={img} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {post.categories && post.categories.length > 0 && (
                              <div className="absolute bottom-4 left-4 z-10">
                                <span className="text-white/60 font-regular uppercase tracking-wider text-[10px] drop-shadow-md">{post.categories[0]}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col flex-1">
                          {!img && post.categories && post.categories.length > 0 && (
                            <div className="text-black font-semibold uppercase tracking-wider text-[10px] mb-2">
                              {post.categories[0]}
                            </div>
                          )}
                          <div className="flex items-start justify-between gap-4 mb-3 mx-2">
                            <h2 className="text-2xl md:text-3xl font-semibold text-black font-[family-name:var(--font-familjen-grotesk)] leading-tight group-hover:text-black/80 transition-colors">
                              {post.title}
                            </h2>
                            <div className="text-xs font-medium text-gray-400 shrink-0 pt-2 md:pt-2.5 font-[family-name:var(--font-geist-sans)]">
                              {new Date(post.pubDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="text-gray-600 text-sm line-clamp-3 font-[family-name:var(--font-geist-sans)] mx-2">
                            {extractDescription(post["content:encoded"])}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 py-10 font-[family-name:var(--font-geist-sans)]">
              No articles found on Medium. Check back later!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
