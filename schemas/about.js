import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'Percorso',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'object',
      fields: [
        defineField({ name: 'it', title: 'Italiano', type: 'text', rows: 6, validation: r => r.required() }),
        defineField({ name: 'en', title: 'English',  type: 'text', rows: 6 }),
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Linea del tempo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'year',  title: 'Anno',  type: 'number', validation: r => r.required() }),
            defineField({
              name: 'title',
              title: 'Titolo',
              type: 'object',
              fields: [
                defineField({ name: 'it', title: 'Italiano', type: 'string', validation: r => r.required() }),
                defineField({ name: 'en', title: 'English',  type: 'string' }),
              ],
            }),
            defineField({
              name: 'description',
              title: 'Descrizione',
              type: 'object',
              fields: [
                defineField({ name: 'it', title: 'Italiano', type: 'text', rows: 3 }),
                defineField({ name: 'en', title: 'English',  type: 'text', rows: 3 }),
              ],
            }),
          ],
          preview: {
            select: { year: 'year', title: 'title.it' },
            prepare: ({ year, title }) => ({ title: `${year} — ${title || '…'}` }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Percorso / About' }) },
})
