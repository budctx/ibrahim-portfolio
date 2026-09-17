import {collection, config, fields} from '@keystatic/core';

const requiredText = (label: string, multiline = false) =>
  fields.text({label, multiline, validation: {isRequired: true}});

const projectImage = (label: string) =>
  fields.image({
    label,
    directory: 'public/project-media',
    publicPath: '/project-media/',
    schema: {
      altEn: requiredText('Alt text — English'),
      altAr: requiredText('Alt text — Arabic'),
    },
  });

export default config({
  storage: {
    kind: 'github',
    repo: 'budctx/ibrahim-portfolio',
  },
  ui: {
    brand: {name: 'Ibrahim Portfolio'},
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
        year: requiredText('Year'),
        typeEn: requiredText('Type — English'),
        typeAr: requiredText('Type — Arabic'),
        roleEn: requiredText('Role — English'),
        roleAr: requiredText('Role — Arabic'),
        tools: fields.array(fields.text({label: 'Tool', validation: {isRequired: true}}), {
          label: 'Tools',
          validation: {length: {min: 1}},
        }),
        cover: projectImage('Cover image'),
        gallery: fields.array(projectImage('Gallery image'), {label: 'Gallery'}),
        problemEn: requiredText('Problem — English', true),
        problemAr: requiredText('Problem — Arabic', true),
        contextEn: requiredText('Context — English', true),
        contextAr: requiredText('Context — Arabic', true),
        processEn: requiredText('Process — English', true),
        processAr: requiredText('Process — Arabic', true),
        decisionsEn: requiredText('Key decisions — English', true),
        decisionsAr: requiredText('Key decisions — Arabic', true),
        outcomeEn: requiredText('Outcome — English', true),
        outcomeAr: requiredText('Outcome — Arabic', true),
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
