import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'luca-jop',
  title: 'Luca Jop Architetto',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      title: 'Contenuti',
    }),
    visionTool({ title: 'Query' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
