import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    readingTime: z.string().optional(),
    author: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
