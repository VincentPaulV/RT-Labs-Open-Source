// import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

const project = {
  name: "project",
  title: "Project",
  description: "Project Schema",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "logo",
      title: "Project Logo",
      type: "image",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Upload a cover image for this project",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "aim",
      title: "Aim",
      type: "text",
      rows: 4,
    },
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        description:
          "Add a custom slug for the URL or generate one from the name",
        options: { source: "name" },
        validation: (rule) => rule.required(),
      }),
    {
        name: "theory",
        title: "Theory",
        type: "text",
        rows: 4,
    },
    {
        name: "procedure",
        title: "Procedure",
        type: "text",
        rows: 4,
    },
    {
        name: "Results",
        title: "Results",
        type: "text",
        rows: 4,
    },
    {
        name: "Assignment",
        title: "Assignment",
        type: "file",
    },
    {
        name: "experiment_URL",
        title: "experiment_URL",
        type: "url",
        initialValue: "https://localhost:3001/",
      },
  ],
};

export default project;