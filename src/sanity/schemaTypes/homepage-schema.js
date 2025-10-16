const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  
  groups: [
    {
      name: 'content',
      title: 'Page Content',
      default: true,
    },
    {
      name: 'navigation', 
      title: 'Global Navigation',
    },
  ],

  fields: [
    // --- Hero Section ---
    {
      name: 'heroText',
      title: 'Home Hero Text',
      type: 'text',
      description: 'The main, prominent text for the hero section.',
      group: 'content',
    },
    {
      name: 'heroImage',
      title: 'Home Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the hero image.',
        },
      ],
      description: 'The main background or feature image for the hero section.',
      group: 'content',
    },

    // --- Centered Content Section ---
    {
      name: 'centeredTitle',
      title: 'Orange Centered Title',
      type: 'string',
      description: 'The main title for the centered section.',
      group: 'content',
    },
    {
      name: 'centeredDescription',
      title: 'Orange Centered Description',
      type: 'text',
      description: 'The descriptive text for the centered section.',
      group: 'content',
    },

    // ==========================================================
    // --- NAVIGATION GROUP -------------------------------------
    // ==========================================================
    {
      name: 'mainMenu',
      title: 'Main Menu Links',
      type: 'array',
      of: [
        {
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          fields: [
            {
              name: 'linkText',
              title: 'Link Text',
              type: 'string',
              description: 'The visible text for the menu option (e.g., "About Us").',
              validation: Rule => Rule.required(),
            },
            {
              name: 'linkUrl',
              title: 'Link URL (Path)',
              type: 'string',
              description: 'The path or full URL (e.g., "/about" or "https://external.com").',
              validation: Rule => Rule.required(),
            },
            {
              name: 'linkTarget',
              title: 'Link Target Window',
              type: 'string',
              options: {
                list: [
                  { title: 'Same Tab', value: '_self' },
                  { title: 'New Tab', value: '_blank' },
                ],
                layout: 'dropdown',
              },
              initialValue: '_self',
              description: 'Controls where the link opens: same tab or new tab.',
            },
          ],
          preview: {
            select: {
              title: 'linkText',
              subtitle: 'linkUrl',
            },
          },
        },
      ],
      description: 'Add and manage all main navigation links.',
      group: 'navigation', 
    },
    

  ],

  // Preview configuration for the Sanity Studio document list
  preview: {
    select: {
      title: 'centeredTitle',
      subtitle: 'heroText',
      media: 'heroImage',
    },
  },
};

export default homePage;