import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "organizationName",
      title: "Organization Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "organizationLogo",
      title: "Organization Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Internship", "Freelance", "Contract", "Self-employed"],
      },
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
      name: "duration",
      title: "Duration",
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
      title: "jobTitle",
      subtitle: "organizationName",
      media: "organizationLogo",
    },
  },
});
