const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  
  groups: [
    {
      name: 'navigation', 
      title: 'Global Navigation',
      default: true,
    },
    {
      name: 'content',
      title: 'Page Content',
    },
    {
      name: 'footer',
      title: 'Global Footer',
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
      type: 'text',
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

    // --- Horizontal Showcase Section ---
    {
      name: 'horizontalShowcase',
      title: 'Horizontal Showcase',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for the entire showcase section.',
        },
        {
          name: 'items',
          title: 'Showcase Items',
          type: 'array',
          of: [
            {
              name: 'horizontalShowcaseItem',
              title: 'Showcase Item',
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Alternative text for the image.',
                    },
                  ],
                  description: 'Image for the showcase item. Suggested ratio: 480x684.',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  description: 'Title for the showcase item (Geogrotesque Cond, 45px, line height 90%).',
                  validation: Rule => Rule.required().max(50),
                },
                {
                  name: 'description',
                  title: 'Short Description',
                  type: 'string',
                  description: 'Short description (Superclarendon, 25px, letter spacing -0.32px, max of 7 words).',
                  validation: Rule => Rule.required().max(50),
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'image',
                },
              },
            },
          ],
          description: 'Add showcase items. Maximum 3 items recommended.',
          validation: Rule => Rule.max(3),
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'items',
        },
        prepare(selection) {
          const { title, subtitle } = selection;
          const itemCount = subtitle ? subtitle.length : 0;
          return {
            title: title || 'Horizontal Showcase',
            subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
          };
        },
      },
      description: 'Horizontal showcase section with up to 3 items. Displays as grid on desktop, slider on mobile.',
      group: 'content',
    },

    // --- Methodology Section ---
    {
      name: 'methodology',
      title: 'Methodology',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Methodology Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for the image.',
            },
          ],
          description: 'Optional image for methodology section. Suggested ratio: 1440x800.',
        },
        {
          name: 'steps',
          title: 'Methodology Steps',
          type: 'array',
          of: [
            {
              name: 'methodologyStep',
              title: 'Methodology Step',
              type: 'object',
              fields: [
                {
                  name: 'counter',
                  title: 'Counter',
                  type: 'string',
                  description: 'Step counter (e.g., "01", "02"). Maximum 2 characters.',
                  validation: Rule => Rule.required().max(2),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  description: 'Step description. Maximum 47 characters.',
                  validation: Rule => Rule.required().max(47),
                },
              ],
              preview: {
                select: {
                  title: 'counter',
                  subtitle: 'description',
                },
              },
            },
          ],
          description: 'Add methodology steps. Each step has a counter and description.',
        },
      ],
      preview: {
        select: {
          title: 'steps',
        },
        prepare(selection) {
          const steps = selection.title || [];
          return {
            title: 'Methodology',
            subtitle: `${steps.length} step${steps.length !== 1 ? 's' : ''}`,
          };
        },
      },
      description: 'Methodology section with optional image and step-by-step process.',
      group: 'content',
    },

    // --- 50Contact Section ---
    {
      name: 'fiftyContact',
      title: '50Contact',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Contact Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for the image.',
            },
          ],
          description: 'Image for the left side of the contact section.',
        },
        {
          name: 'title',
          title: 'Contact Title',
          type: 'text',
          description: 'Main title for the contact section.',
        },
        {
          name: 'description',
          title: 'Contact Description',
          type: 'text',
          description: 'Description text for the contact section.',
        },
        {
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'CTA Text',
              type: 'string',
              description: 'Text for the call-to-action button.',
            },
            {
              name: 'url',
              title: 'CTA URL',
              type: 'string',
              description: 'URL for the call-to-action button.',
            },
            {
              name: 'target',
              title: 'Link Target',
              type: 'string',
              options: {
                list: [
                  { title: 'Same Tab', value: '_self' },
                  { title: 'New Tab', value: '_blank' },
                ],
              },
              description: 'Whether the link opens in the same tab or a new tab.',
            },
          ],
          description: 'Call-to-action button configuration.',
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'description',
        },
      },
      description: '50/50 contact section with image and content.',
      group: 'content',
    },

    // ==========================================================
    // --- NAVIGATION GROUP -------------------------------------
    // ==========================================================
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the logo.',
        },
      ],
      description: 'The main logo used in navigation and footer. Links to homepage.',
      group: 'navigation',
    },
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

    // ==========================================================
    // --- FOOTER GROUP -----------------------------------------
    // ==========================================================
    {
      name: 'footerCoordinates',
      title: 'Footer Coordinates',
      type: 'string',
      description: 'Geographic coordinates displayed in the orange footer bar (left side).',
      group: 'footer',
    },
    {
      name: 'footerCoordinatesLink',
      title: 'Coordinates Link (Optional)',
      type: 'url',
      description: 'Optional link for the coordinates (e.g., Google Maps link).',
      group: 'footer',
    },
    {
      name: 'footerPhone',
      title: 'Footer Phone Number',
      type: 'string',
      description: 'Phone number displayed in the orange footer bar (right side).',
      group: 'footer',
    },
    {
      name: 'footerSocialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          name: 'socialItem',
          title: 'Social Media Item',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'Social media platform (e.g., "Instagram", "Facebook").',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'Social Media URL',
              type: 'url',
              description: 'Link to the social media profile.',
              validation: Rule => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
      description: 'Social media links. No limit - will stack vertically when more than 2.',
      group: 'footer',
    },
    {
      name: 'footerEmail',
      title: 'Footer Email',
      type: 'email',
      description: 'Email address displayed in the footer.',
      group: 'footer',
    },
    {
      name: 'footerAdditionalLinks',
      title: 'Company Information',
      type: 'array',
      of: [
        {
          name: 'additionalItem',
          title: 'Company Info Item',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              description: 'Company name or license number.',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL (Optional)',
              type: 'url',
              description: 'Optional link for this item.',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
            },
          },
        },
      ],
      description: 'Company name and license number. Maximum 2 items.',
      validation: Rule => Rule.max(2),
      group: 'footer',
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