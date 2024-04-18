import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "9f7smtu6",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-02-05",
};

const client = createClient(config);

export default client;