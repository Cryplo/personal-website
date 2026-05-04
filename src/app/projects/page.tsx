import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

const FEATURED_PROJECTS = [
  {
    title: "GlitterCode",
    slug: "glittercode",
  },
  {
    title: "xAI Hackathon: Grok Lens",
    slug: "xai-hackathon",
  },
  {
    title: "F1 Racing Game",
    slug: "f1-racing-game",
  },
] as const;

function FeaturedProjectCard({
  project,
  slug,
  isReversed,
}: {
  project: (typeof DATA.projects)[number];
  slug: string;
  isReversed: boolean;
}) {
  return (
    <article
      className={cn(
        "grid min-h-[420px] overflow-hidden rounded-lg border border-border/70 bg-card/50 shadow-sm md:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]",
        isReversed && "md:grid-cols-[minmax(320px,0.75fr)_minmax(0,1.25fr)]"
      )}
    >
      <div
        className={cn(
          "relative min-h-[280px] bg-black md:min-h-[420px]",
          isReversed && "md:order-2"
        )}
      >
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain object-center"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            Preview coming soon
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
        <div className="space-y-3">
          <time className="text-sm text-muted-foreground">{project.dates}</time>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <Markdown className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert">
            {project.description}
          </Markdown>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tag) => (
            <Badge className="px-2 py-0.5 text-xs" variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href={`/projects/${slug}`}>
              Case Study
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
          {project.links.map((link, idx) => (
            <Button asChild variant="outline" key={idx}>
              <Link href={link.href} target="_blank">
                {link.type}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const featuredProjects = FEATURED_PROJECTS.map(({ title, slug }) => {
    const project = DATA.projects.find((item) => item.title === title);

    if (!project) {
      throw new Error(`Missing featured project: ${title}`);
    }

    return { project, slug };
  });
  const featuredTitles = new Set<string>(
    FEATURED_PROJECTS.map((project) => project.title)
  );
  const remainingProjects = DATA.projects.filter(
    (project) => !featuredTitles.has(project.title)
  );

  return (
    <main className="flex min-h-[100dvh] flex-col px-4 pb-16 sm:px-6">
      <section id="projects">
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-col items-center justify-center space-y-4 pt-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Projects
                </h2>
              </div>
            </div>
          </BlurFade>
          <div className="space-y-8">
            {featuredProjects.map(({ project, slug }, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 2 + id * BLUR_FADE_DELAY}
              >
                <FeaturedProjectCard
                  project={project}
                  slug={slug}
                  isReversed={id % 2 === 1}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="more-projects" className="mt-16">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                More Projects
              </h2>
            </div>
          </BlurFade>
          <div
            className="grid w-full gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
          >
            {remainingProjects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 6 + Math.floor(id / 2) * BLUR_FADE_DELAY}
              >
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  scale={"scale" in project ? project.scale : false}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
