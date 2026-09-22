"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Badge } from "@/components/ui/badge";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 px-6 sm:px-12 pt-16 sm:pt-24 pb-12 max-w-4xl mx-auto">
      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] text-lg md:text-xl whitespace-pre-wrap"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-40 border">
                <AvatarImage
                  alt={DATA.name}
                  className="object-cover object-center"
                  src={DATA.avatarUrl}
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="!mt-0">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-2xl font-bold mb-2">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Markdown className="prose prose-lg max-w-full text-pretty font-sans dark:prose-invert whitespace-pre-wrap">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-2xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={`${education.school}-${education.degree}`}
              delay={BLUR_FADE_DELAY * 5 + id * 0.05}
            >
              <ResumeCard
                key={`${education.school}-${education.degree}`}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                href={education.href}
                badges={education.badges}
                period={`${education.start} - ${education.end ?? "Present"}`}
                gpa={education.gpa}
                description={education.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" className="space-y-4">
        <h2 className="text-2xl font-bold">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {DATA.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </section>
      <section id="hackathons" className="space-y-4">
        <h2 className="text-2xl font-bold">Hackathons</h2>
        <p className="text-lg text-muted-foreground">{DATA.hackathons.join(" · ")}</p>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-2xl font-bold">Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 7 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
