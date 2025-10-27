const contactPage = {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'text',
      description: 'The main title for the contact page',
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
      title: 'title',
      subtitle: 'contactTypes',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Contact Page',
        subtitle: `${subtitle?.length || 0} contact types`,
      };
    },
  },
};

export default contactPage;

