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
  ],
  preview: {
    select: {
      title: 'heroText',
      media: 'heroImage',
    },
  },
};

export default servicesPage;
