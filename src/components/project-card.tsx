'use client';

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  scale: boolean;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  scale,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      // Trigger animation after modal is mounted
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    }
  }, [isModalOpen]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 300);
    }
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // Don't open modal if a link or button was clicked
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    setIsModalOpen(true);
  }, []);

  const modalContent = isModalOpen && (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out",
        isAnimating ? "bg-black/80 opacity-100" : "bg-black/0 opacity-0"
      )}
      style={{ zIndex: 9999 }}
      onClick={handleBackdropClick}
    >
      <Card
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ease-out w-[70vw] max-w-3xl max-h-[90vh] overflow-y-auto",
          isAnimating ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            controls
            playsInline
            className="mx-auto w-full max-h-[50vh] object-contain"
          />
        )}
        {image && !video && (
          <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            className="w-full max-h-[50vh] object-contain"
          />
        )}
        <CardHeader className="px-6">
          <div className="space-y-2">
            <CardTitle className="mt-1 text-2xl">{title}</CardTitle>
            <time className="font-sans text-base text-muted-foreground">{dates}</time>
            <div className="hidden font-sans text-base underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-base text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col px-6">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags?.map((tag) => (
                <Badge
                  className="px-2.5 py-1 text-sm"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-2">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-3 py-1.5 text-sm">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <>
      {/* Portal modal to document body for proper z-index and centering */}
      {mounted && modalContent && createPortal(modalContent, document.body)}

      <Card
        className={cn(
          "flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 ease-out h-full min-w-[300px] cursor-pointer",
          isAnimating && "opacity-0"
        )}
        onClick={handleCardClick}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto h-40 w-full object-cover object-top"
            style={ scale ? { objectFit: "contain" } : { objectFit: "cover" } }
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
        <CardHeader className="px-3">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-lg">{title}</CardTitle>
            <time className="font-sans text-sm text-muted-foreground">{dates}</time>
            <div className="hidden font-sans text-sm underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-3">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-2 py-0.5 text-xs"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-3 pb-3">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-xs">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
