import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const CASE_STUDIES = {
  glittercode: {
    title: "GlitterCode",
    status: "December 2025 - January 2026",
    sections: [
      {
        title: "Context",
        body: "Coming Soon",
      },
      {
        title: "Design",
        body: "Coming Soon",
      },
      {
        title: "Development",
        body: "Coming Soon",
      },
      {
        title: "Completion",
        body: "Coming Soon",
      },
    ],
  },
  "xai-hackathon": {
    title: "xAI Hackathon: Grok Lens",
    status: "December 2025",
    placeholder: "To be updated",
  },
  "f1-racing-game": {
    title: "F1 Racing Game",
    status: "February 2023 - March 2023; August 2025",
    placeholder: "To be updated",
  },
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
          <p className="text-base text-muted-foreground">{caseStudy.status}</p>
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

      {"placeholder" in caseStudy ? (
        <section className="rounded-lg border border-border/70 bg-card/50 p-8">
          <p className="text-lg text-muted-foreground">{caseStudy.placeholder}</p>
        </section>
      ) : (
        <div className="space-y-10">
          {caseStudy.sections.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="text-base leading-7 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
