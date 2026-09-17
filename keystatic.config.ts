import {collection, config, fields} from '@keystatic/core';

const text = (label: string, multiline = false) => fields.text({label, multiline});
const requiredText = (label: string) =>
  fields.text({label, validation: {isRequired: true}});

const imageField = (label: string) =>
  fields.image({
    label,
    directory: 'public/project-media',
    publicPath: '/project-media/',
  });

export default config({
  storage: {
    kind: 'github',
    repo: 'budctx/ibrahim-portfolio',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      path: 'content/projects/*',
      slugField: 'slug',
      format: 'yaml',
      previewUrl: 'https://ibrahim-portfolio-blush.vercel.app/projects/{slug}',
      columns: ['titleEn', 'classification', 'status'],
      schema: {
        projectKey: requiredText('Project Key'),
        titleEn: requiredText('Title — English'),
        titleAr: requiredText('Title — Arabic'),
        slug: fields.text({
          label: 'Slug',
          description: 'Stable shared slug for English and Arabic routes. Lowercase letters, numbers and hyphens only.',
          validation: {
            isRequired: true,
            pattern: {regex: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens only.'},
          },
        }),
        classification: fields.select({
          label: 'Classification',
          options: [
            {label: 'Flagship', value: 'flagship'},
            {label: 'Selected', value: 'selected'},
            {label: 'Playground', value: 'playground'},
          ],
          defaultValue: 'selected',
        }),
        status: fields.select({
          label: 'Visibility',
          options: [
            {label: 'Draft', value: 'draft'},
            {label: 'Published', value: 'published'},
            {label: 'Hidden', value: 'hidden'},
          ],
          defaultValue: 'draft',
        }),
        order: fields.integer({label: 'Manual order', defaultValue: 999, validation: {min: 0}}),
        featured: fields.checkbox({label: 'Featured', defaultValue: false}),
        year: text('Year'),
        typeEn: text('Type — English'),
        typeAr: text('Type — Arabic'),
        roleEn: text('Role — English'),
        roleAr: text('Role — Arabic'),
        tools: fields.array(fields.text({label: 'Tool', validation: {isRequired: true}}), {
          label: 'Tools',
        }),
        cover: imageField('Cover image'),
        coverAltEn: text('Cover alt text — English'),
        coverAltAr: text('Cover alt text — Arabic'),
        gallery: fields.array(
          fields.object({
            image: imageField('Image'),
            altEn: text('Alt text — English'),
            altAr: text('Alt text — Arabic'),
          }),
          {
            label: 'Gallery',
            itemLabel: (props) => props.fields.altEn.value || 'Gallery image',
          },
        ),
        problemEn: text('Problem — English', true),
        problemAr: text('Problem — Arabic', true),
        contextEn: text('Context — English', true),
        contextAr: text('Context — Arabic', true),
        processEn: text('Process — English', true),
        processAr: text('Process — Arabic', true),
        decisionsEn: text('Key decisions — English', true),
        decisionsAr: text('Key decisions — Arabic', true),
        outcomeEn: text('Outcome — English', true),
        outcomeAr: text('Outcome — Arabic', true),
        projectUrl: fields.text({
          label: 'Project URL',
          description: 'Optional public HTTPS URL.',
          validation: {
            pattern: {regex: /^$|^https:\/\/.+/, message: 'Leave empty or use an HTTPS URL.'},
          },
        }),
        rightsCleared: fields.checkbox({
          label: 'Rights cleared for public display',
          defaultValue: false,
        }),
        ndaCleared: fields.checkbox({
          label: 'NDA / redaction complete',
          defaultValue: false,
        }),
        contentOrigin: fields.select({
          label: 'Content origin',
          options: [
            {label: 'Real work', value: 'real'},
            {label: 'Development fixture', value: 'development'},
          ],
          defaultValue: 'real',
        }),
      },
    }),
  },
});
