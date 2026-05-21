import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contacts = defineType({
  name: 'contacts',
  title: 'Contatti',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'name',  title: 'Nome',     type: 'string' }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string' }),
    defineField({ name: 'email', title: 'Email',    type: 'string' }),
    defineField({
      name: 'address',
      title: 'Indirizzo studio',
      type: 'object',
      fields: [
        defineField({ name: 'street',  title: 'Via',        type: 'string' }),
        defineField({ name: 'city',    title: 'Città e CAP', type: 'string' }),
        defineField({ name: 'country', title: 'Paese',      type: 'string' }),
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Contatti' }) },
})
