import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// These document types have exactly one document each.
// The structure builder shows them as direct-edit items (no list).
const SINGLETONS = ['home', 'about', 'contacts']

export default defineConfig({
  name: 'luca-jop',
  title: 'Luca Jop Architetto',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      title: 'Contenuti',
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.listItem().title('Home').id('home')
              .child(S.document().schemaType('home').documentId('home')),
            S.listItem().title('Percorso').id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem().title('Contatti').id('contacts')
              .child(S.document().schemaType('contacts').documentId('contacts')),
            S.divider(),
            S.documentTypeListItem('work').title('Progetti'),
          ]),
    }),
    visionTool({ title: 'Query' }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent "Create new" for singleton types
    templates: (prev) =>
      prev.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
})
