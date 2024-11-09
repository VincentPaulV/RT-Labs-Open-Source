import React from 'react';
import { getSingleProject } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import ExperimentViewer from "../../components/ExperimentViewer";

type Props = {
  params: {
    project: string;
  };
};

export default async function ExperimentPage({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 mt-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
          {project.name} - Experiment
        </h1>
        <ExperimentViewer 
          experimentUrl={project.experiment_URL}
          projectSlug={slug}
          projectName={project.name}
        />
      </div>
    </main>
  );
} 