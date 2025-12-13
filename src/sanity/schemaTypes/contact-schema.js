const contactPage = {
  name: 'contactPage',
  title: 'Contact Page',
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
      name: 'title',
      title: 'Page Title',
      type: 'text',
      description: 'The main title for the contact page',
    },
    {
      name: 'description',
      title: 'Page Description',
      type: 'text',
      description: 'Optional description text below the page title. Will be hidden if empty.',
    },
    {
      name: 'contactTypes',
      title: 'Contact Types',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Contact Type Value',
              type: 'string',
              description: 'The value/name of the contact type (e.g., "Sales", "Rental", etc.)',
            },
          ],
          preview: {
            select: {
              title: 'value',
            },
          },
        },
      ],
      description: 'Array of contact types to display as buttons',
    },
  ],
  preview: {
    select: {
      title: 'pagePreviewName',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Content',
      };
    },
  },
};

export default contactPage;

