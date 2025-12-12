export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Page Content', default: true }
  ],
  fields: [
    {
      name: 'pagePreviewName',
      title: 'Page Preview Name',
      type: 'string',
      description: 'This is the name of the page shown in the preview list.',
      validation: Rule => Rule.required().error('Page preview name is required'),
      group: 'content',
    },
    {
      name: 'orderRank',
      type: 'string',
      hidden: true,
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      group: 'content'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'items',
          title: 'About Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'headline',
                  title: 'Headline',
                  type: 'string',
                  description: 'Headline for the item (20px, Geogrotesque)',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'text',
                  description: 'Title for the item (25px, Superclarendon)',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  description: 'Description text (22px, Superclarendon)',
                },
              ],
              preview: {
                select: {
                  title: 'headline',
                  subtitle: 'title',
                },
              },
            },
          ],
          validation: Rule => Rule.max(3),
          description: 'List of 3 about items.',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
          description: 'Full width image for the bottom of the section.',
        },
      ],
    },
    {
      name: 'fiftySection',
      title: 'FiftySection',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'header',
          title: 'Header',
          type: 'string',
          description: 'Header text above the title.',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'title',
          title: 'Title',
          type: 'text',
          description: 'Main title for the section.',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Description text for the section.',
        },
        {
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'string',
            },
            {
              name: 'target',
              title: 'Link Target',
              type: 'string',
              options: {
                list: [
                  { title: 'Same Window', value: '_self' },
                  { title: 'New Window', value: '_blank' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'quoteTitle',
      title: 'Quote Section Title',
      type: 'text',
      description: 'The title text for the quote section. Respects whitespace and text wrap.',
      group: 'content'
    },
    {
      name: 'quoteImage',
      title: 'Quote Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the quote section image.',
        },
      ],
      description: 'Optional. Full width image for the quote section.',
      group: 'content'
    },
  ],
  preview: {
    select: {
      title: 'pagePreviewName',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Content',
        media: media,
      };
    },
  },
}

