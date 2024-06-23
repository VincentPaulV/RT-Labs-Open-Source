
// app/projects/page.tsx

import Link from "next/link";
import { getExperiment } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import GradualSpacing from "../components/ui/gradual-spacing";

export default async function Project() {
  const projects: ProjectType[] = await getExperiment();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-4xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          <GradualSpacing text="Vibrations RT-Labs Experiments" />  
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          These are some experiments developed in-house at NITK that can be used for testing the setup.
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">{project.name}</h2>
              <div className="text-sm text-zinc-400">{project.tagline}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}