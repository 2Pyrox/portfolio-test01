import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Path or URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description: "e.g. copyright line",
    }),
    defineField({
      name: "contactEmail",
      title: "Public Contact Email",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
