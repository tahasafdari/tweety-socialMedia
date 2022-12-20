import sanityClient from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  baseUrl: process.env.REACT_APP_SANITY_URL,
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-12-12",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client); //https://www.sanity.io/docs/image-url --> for more explanation documantation

export const urlFor = (source) => builder.image(source);
