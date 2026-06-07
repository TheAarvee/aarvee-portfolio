import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "schoolName",
      title: "School Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "schoolLogo",
      title: "School Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "degree",
      title: "Degree with Stream",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Month / Year",
      type: "string",
    }),
    defineField({
      name: "endDate",
      title: "End Month / Year",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "schoolName",
      subtitle: "degree",
      media: "schoolLogo",
    },
  },
});
