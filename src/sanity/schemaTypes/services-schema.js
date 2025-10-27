const servicesPage = {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'heroText',
      title: 'Services Hero Text',
      type: 'text',
      description: 'The main, prominent text for the services hero section.',
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
      description: 'The image for the services accordion section.',
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
  ],
  preview: {
    select: {
      title: 'heroText',
      media: 'heroImage',
    },
  },
};

export default servicesPage;
