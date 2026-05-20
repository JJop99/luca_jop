import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const work = defineType({
  name: 'work',
  title: 'Progetto',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Anno',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        defineField({
          name: 'it',
          title: 'Italiano',
          type: 'text',
          rows: 6,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 6,
        }),
      ],
    }),
    defineField({
      name: 'role',
      title: 'Ruolo / Committente',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Testo alternativo',
              type: 'string',
              description: 'Descrivere brevemente cosa si vede (per accessibilità e SEO)',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1).error('Almeno una immagine è richiesta'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'images.0',
    },
    prepare({ title, year, media }) {
      return {
        title: title || 'Senza titolo',
        subtitle: year ? String(year) : '',
        media,
      }
    },
  },
})
