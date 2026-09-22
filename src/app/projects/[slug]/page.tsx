import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const CASE_STUDIES = {
  glittercode: { title: "GlitterCode" },
  "xai-hackathon": { title: "xAI Hackathon: Grok Lens" },
  "f1-racing-game": { title: "F1 Racing Game" },
} as const;

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = CASE_STUDIES[params.slug as keyof typeof CASE_STUDIES];

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.title} Case Study`,
    description: `Case study for ${caseStudy.title}`,
  };
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = CASE_STUDIES[params.slug as keyof typeof CASE_STUDIES];

  if (!caseStudy) {
    notFound();
  }

  const project = DATA.projects.find((item) => item.title === caseStudy.title);

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col gap-10 px-6 pb-16 pt-10 sm:px-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/projects">
            <ArrowLeft className="mr-2 size-4" />
            Projects
          </Link>
        </Button>
      </div>

      <header className="space-y-5">
        <div className="space-y-3">
          <Badge variant="secondary">Case Study</Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
            {caseStudy.title}
          </h1>
          <p className="text-base text-muted-foreground">{project?.dates}</p>
        </div>

        {project?.video && (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="max-h-[520px] w-full rounded-lg border bg-black object-contain object-center"
          />
        )}
      </header>

      {project && (
        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="text-base leading-7 text-muted-foreground">{project.description}</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Built with</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge key={technology} variant="secondary">{technology}</Badge>
              ))}
            </div>
          </section>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <Button key={link.href} asChild variant="outline">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">{link.type}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
