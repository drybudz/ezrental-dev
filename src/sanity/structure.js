// https://www.sanity.io/docs/structure-builder-cheat-sheet
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'homePage',
        title: 'Home Pages',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'aboutPage',
        title: 'About Pages',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'servicesPage',
        title: 'Services Pages',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'contactPage',
        title: 'Contact Pages',
        S,
        context,
      }),
    ])
