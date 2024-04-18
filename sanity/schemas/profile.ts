import { defineField } from "sanity";
// import { BiUser } from "react-icons/bi";

const project = {
  name: "profile",
  title: "Profile",
  type: "document",
//   icon: BiUser,
  fields: [
    {
      name: "Title",
      title: "Title",
      type: "string",
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      description: "In one short sentence, what do you do?",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
    },
 ]
};

export default project;