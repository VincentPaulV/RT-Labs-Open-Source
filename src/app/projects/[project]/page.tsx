// app/projects/[project]/page.tsx

import Image from "next/image";
import { Metadata } from "next";
import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

type Props = {
  params: {
    project: string;
  };
};

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return {
    title: `${project.name} | Project`,
    description: project.tagline,
    openGraph: {
      images: project.coverImage?.image || "add-a-fallback-project-image-here",
      title: project.name,
      description: project.slug,

    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
    <section className="max-w-2xl mb-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
        {project.name}
      </h1>
      <h2 className="text-xl font-bold tracking-tight sm:text-4xl mb-6 mt-12 lg:leading-[3.7rem] leading-tight">Aim</h2>

      <p className="text-lg font-normal text-gray-500 lg:text-lg dark:text-gray-400 sm:text-lg mb-2 mt-2">{project.aim}</p>

      <h2 className="text-4xl font-bold dark:text-white mt-12">Theory</h2>

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-4">{project.theory}</p>

      <h2 className="text-4xl font-bold dark:text-white mt-12">Procedure</h2>

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-4">{project.procedure}</p>

      <h2 className="text-4xl font-bold dark:text-white mt-12">Experiment</h2>
     <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12 mt-6">

          <Link
            href={`/experiment/${slug}`}
            key={project._id}
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">Go to the Experiment</h2>
              <div className="text-sm text-zinc-400">Note: You have 5 mins to complete it!</div>
            </div>
          </Link>
      </section>
      <h2 className="text-4xl font-bold dark:text-white mt-12">Results</h2>

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-4">{project.Results}</p>
    </section>

  </main>
  
  );
}