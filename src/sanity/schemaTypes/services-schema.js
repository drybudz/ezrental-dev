const servicesPage = {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'pagePreviewName',
      title: 'Page Preview Name',
      type: 'string',
      description: 'This is the name of the page shown in the preview list.',
      validation: Rule => Rule.required().error('Page preview name is required'),
    },
    {
      name: 'orderRank',
      type: 'string',
      hidden: true,
    },
    {
      name: 'heroText',
      title: 'Services Hero Text',
      type: 'text',
      description: 'The main, prominent text for the services hero section.',
    },
    {
      name: 'heroDescription',
      title: 'Services Hero Description',
      type: 'text',
      description: 'Optional description text below the hero text. Will be hidden if empty.',
    },
    {
      name: 'heroImage',
      title: 'Services Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the services hero image.',
        },
      ],
      description: 'The main background or feature image for the services hero section.',
    },
    {
      name: 'servicesImage',
      title: 'Services Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the services image.',
        },
      ],
      description: 'Optional. The image for the services accordion section.',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              description: 'The title of the service.',
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              description: 'The description of the service.',
            },
            {
              name: 'servicesDetails',
              title: 'Services Details',
              type: 'array',
              of: [{ type: 'text' }],
              description: 'List of service details to display inline with circles between items. Use line breaks to separate groups (no dots will appear between line breaks).',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: Rule => Rule.max(10),
      description: 'List of services (max 10).',
    },
    {
      name: 'quoteTitle',
      title: 'Quote Section Title',
      type: 'text',
      description: 'The title text for the quote section. Respects whitespace and text wrap.',
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
    },
  ],
  preview: {
    select: {
      title: 'pagePreviewName',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Services Content',
        media: media,
      };
    },
  },
};

export default servicesPage;
