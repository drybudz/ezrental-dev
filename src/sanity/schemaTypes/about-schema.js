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
      group: 'content'
    }
  ]
}

