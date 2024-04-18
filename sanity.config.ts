import { profile } from "console";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import project from "./sanity/schemas/profile";
import { schemaTypes } from "./sanity/schemas";

const config = defineConfig({
    projectId: "9f7smtu6",
    dataset: "production",
    title: "Vincent's Website",
    // apiVersion: "2023-12-30",
    basePath: "/admin",
    plugins: [deskTool()],
    schema: {types : schemaTypes}
});

export default config;