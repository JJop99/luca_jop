import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Immagine di sfondo',
      type: 'image',
      options: { hotspot: true },
      description: 'Immagine hero a schermo intero della homepage',
    }),
  ],
  preview: { prepare: () => ({ title: 'Home' }) },
})
