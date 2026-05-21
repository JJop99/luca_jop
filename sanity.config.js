import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

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
            // Singletons: show as list, one click to edit
            S.documentTypeListItem('home').title('Home'),
            S.documentTypeListItem('about').title('Percorso'),
            S.documentTypeListItem('contacts').title('Contatti'),
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
