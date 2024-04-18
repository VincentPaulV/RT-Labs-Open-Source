import { PortableTextBlock } from "sanity";

export type ProfileType = {
  _id: string,
  Title: string,
  headline: string,
  fullBio: PortableTextBlock[],
  location: string,
  email: string
};

export type ProjectType = {
    _id: string;
    name: string;
    tagline: string;
    slug: string;
    logo: string;
    coverImage: {
      alt: string | null;
      image: string;
    };
    aim: string;
    theory: string;
    procedure: string;
    Results: string;
    Assignment: string;
    experiment_URL: string;
  };