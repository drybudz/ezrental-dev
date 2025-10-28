export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Page Content', default: true }
  ],
  fields: [
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
    {
      name: 'leftInfoBanner',
      title: 'LeftInfoBanner',
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
          title: 'Background Image',
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
          description: 'Main title for the banner (40px font size).',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Description text for the banner.',
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
  ]
}

