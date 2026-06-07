"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DotmSquare15 } from "@/components/ui/dotm-square-15";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  "content:encoded": string;
}

// Helper to extract first image from content
const extractImage = (content: string) => {
  if (!content) return null;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

interface RecentBlogsProps {
  theme?: "light" | "dark";
  size?: "normal" | "large";
}

export default function RecentBlogs({ theme = "light", size = "normal" }: RecentBlogsProps) {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  const isDark = theme === "dark";
  const isLarge = size === "large";
  
  const textColor = isDark ? "text-white" : "text-black";
  const borderColor = isDark ? "border-white/20" : "border-black/10";
  const hoverColor = isDark ? "group-hover:text-gray-300" : "group-hover:text-[#0648ff]";
  const dateColor = isDark ? "text-gray-400" : "text-gray-500";
  const bgPlaceholder = isDark ? "bg-white/10" : "bg-black/5";

  const headingSize = isLarge ? "text-3xl md:text-5xl mb-10" : "text-2xl md:text-3xl mb-6";
  const titleSize = isLarge ? "text-lg md:text-2xl mb-2" : "text-base md:text-lg mb-1";
  const dateTextSize = isLarge ? "text-sm md:text-base" : "text-xs";
  const imageSize = isLarge ? "w-24 h-24 md:w-48 md:h-28" : "w-16 h-16 md:w-32 md:h-20";
  const paddingY = isLarge ? "py-6 md:py-8 gap-6 md:gap-10" : "py-4 gap-4";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/medium");
        const data = await res.json();
        if (Array.isArray(data)) {
          const sortedPosts = data.sort((a, b) => {
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          });
          // Limit to 4 recent blogs
          setPosts(sortedPosts.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full lg:sticky lg:top-40">
        <h2 className={`font-regular ${textColor} font-[family-name:var(--font-familjen-grotesk)] tracking-tight ${headingSize}`}>
          Recent Blogs
        </h2>
        <div className="flex justify-center items-center py-10">
          <DotmSquare15 size={isLarge ? 48 : 32} dotSize={isLarge ? 6 : 4} color={isDark ? "white" : "black"} />
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col w-full lg:sticky lg:top-40">
      <h2 className={`font-regular ${textColor} font-[family-name:var(--font-familjen-grotesk)] ${headingSize}`}>
        Recent Blogs
      </h2>
      <div className="flex flex-col">
        {posts.map((post, index) => {
          const img = extractImage(post["content:encoded"]);
          return (
            <Link 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={post.guid}
              className={`group flex items-center justify-between w-full ${paddingY} ${index !== posts.length - 1 ? `border-b ${borderColor}` : ''}`}
            >
              <div className="flex flex-col flex-1 min-w-0 pr-4">
                <h3 className={`font-semibold ${textColor} font-[family-name:var(--font-familjen-grotesk)] leading-tight ${hoverColor} transition-colors truncate ${titleSize}`}>
                  {post.title}
                </h3>
                <div className={`${dateColor} font-[family-name:var(--font-geist-sans)] ${dateTextSize}`}>
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              {img && (
                <div className={`relative overflow-hidden rounded-lg ${bgPlaceholder} shrink-0 ml-auto ${imageSize}`}>
                  <img 
                    src={img} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <Link href="/blog" className={`mt-8 ${isLarge ? "text-base mt-10" : "text-sm"} font-medium ${textColor} ${hoverColor} transition-colors inline-flex items-center gap-2 group font-[family-name:var(--font-geist-sans)] tracking-wide`}>
        More
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
