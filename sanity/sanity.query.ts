// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      Title,
      headline,
      location,
      fullBio,
      email,
    }`
  );
}

export async function getExperiment() {
    return client.fetch(
      groq`*[_type == "project"]{
        _id,
        name,
        tagline,
        "slug": slug.current,
        "logo": logo.asset->{url, altText},
        aim,
        theory,
        procedure,
        Results,
        experiment_URL,
        "Assignment": Assignment.asset->url,
      }`
    );
  }

  export async function getSingleProject(slug: string) {
    return client.fetch(
      groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        name,
        tagline,
        aim,
        theory,
        procedure,
        Results,
        experiment_URL,
        "Assignment": Assignment.asset->url,
      }`,
      { slug }
    );
  }