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
    branchPrefix: 'keystatic-',
  },
  collections: {
    graphicDesigns: collection({
      label: 'Graphic Design Gallery',
      path: 'content/graphic-designs/*',
      slugField: 'slug',
      format: 'yaml',
      columns: ['titleEn', 'category', 'status'],
      schema: {
        designId: requiredText('Stable design ID — do not change after publishing'),
        slug: fields.text({label: 'Permanent share slug', description: 'Do not change after publishing. Copy the permanent link from the gallery modal.', validation: {isRequired: true, pattern: {regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Use lowercase letters, numbers and hyphens.'}}}),
        titleEn: requiredText('Title — English'),
        titleAr: requiredText('Title — Arabic'),
        descriptionEn: fields.text({label: 'One-line description — English', validation: {isRequired: true, length: {max: 240}, pattern: {regex: /^[^\r\n]+$/, message: 'Use one concise line.'}}}),
        descriptionAr: fields.text({label: 'One-line description — Arabic', validation: {isRequired: true, length: {max: 240}, pattern: {regex: /^[^\r\n]+$/, message: 'Use one concise line.'}}}),
        selfInitiated: fields.checkbox({label: 'Self-initiated work (no client)', defaultValue: false}),
        entityEn: text('Client / entity — English (required unless self-initiated)'),
        entityAr: text('Client / entity — Arabic (required unless self-initiated)'),
        entityLogo: imageField('Client / server logo (optional)'),
        category: fields.select({label: 'Discipline', options: [
          {label: 'Discord', value: 'discord'},
          {label: 'Brand Identity', value: 'brand-identity'},
          {label: 'Social & Campaigns', value: 'social-campaigns'},
          {label: 'Print & Packaging', value: 'print-packaging'},
        ], defaultValue: 'discord'}),
        cover: imageField('Cover image'),
        coverAltEn: requiredText('Cover description — English'),
        coverAltAr: requiredText('Cover description — Arabic'),
        images: fields.array(fields.object({
          image: imageField('Additional image'),
          altEn: requiredText('Image description — English'),
          altAr: requiredText('Image description — Arabic'),
        }), {label: 'Additional images', itemLabel: props => props.fields.altEn.value || 'Image'}),
        order: fields.integer({label: 'Display order (lowest first)', defaultValue: 999, validation: {min: 0}}),
        status: fields.select({label: 'Publication', options: [{label: 'Draft', value: 'draft'}, {label: 'Published', value: 'published'}, {label: 'Hidden', value: 'hidden'}], defaultValue: 'draft'}),
        contentOrigin: fields.select({label: 'Content origin', options: [{label: 'Real work', value: 'real'}, {label: 'Development fixture (never public)', value: 'development'}], defaultValue: 'real'}),
      },
    }),
    projects: collection({
      label: 'Projects — see docs/editorial-style-guide.md',
      path: 'content/projects/*',
      slugField: 'slug',
      format: 'yaml',
      previewUrl: '/preview/start?branch={branch}&to=/projects/{slug}',
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
        summaryEn: text('Discovery summary — English', true),
        summaryAr: text('Discovery summary — Arabic', true),
        evidenceNoteEn: text('Evidence scope — English', true),
        evidenceNoteAr: text('Evidence scope — Arabic', true),
        tools: fields.array(fields.text({label: 'Tool', validation: {isRequired: true}}), {
          label: 'Tools',
        }),
        cover: imageField('Cover image'),
        coverAltEn: text('Cover alt text — English'),
        coverAltAr: text('Cover alt text — Arabic'),
        coverCaptionEn: text('Cover caption — English'),
        coverCaptionAr: text('Cover caption — Arabic'),
        coverWidth: fields.integer({label: 'Cover width (pixels)', validation: {min: 1}}),
        coverHeight: fields.integer({label: 'Cover height (pixels)', validation: {min: 1}}),
        mediaStyle: fields.select({label: 'Screenshot proportions', options: [{label: 'Wide', value: 'wide'}, {label: 'Portrait', value: 'portrait'}], defaultValue: 'wide'}),
        gallery: fields.array(
          fields.object({
            image: imageField('Image'),
            altEn: text('Alt text — English'),
            altAr: text('Alt text — Arabic'),
            section: fields.select({label: 'Narrative placement', options: ['gallery','problem','context','process','decisions','outcome'].map(value => ({label: value, value})), defaultValue: 'gallery'}),
            captionEn: text('Caption — English', true),
            captionAr: text('Caption — Arabic', true),
            width: fields.integer({label: 'Image width (pixels)', validation: {min: 1}}),
            height: fields.integer({label: 'Image height (pixels)', validation: {min: 1}}),
          }),
          {
            label: 'Gallery',
            itemLabel: (props) => props.fields.altEn.value || 'Gallery image',
          },
        ),
        presentations: fields.array(fields.object({
          section: fields.select({label: 'Chapter', options: ['problem','context','process','decisions','outcome'].map(value => ({label: value, value})), defaultValue: 'problem'}),
          layout: fields.select({label: 'Presentation', options: ['editorial','statement','steps','decisions','split'].map(value => ({label: value, value})), defaultValue: 'editorial'}),
          titleEn: text('Chapter title — English (optional)'),
          titleAr: text('Chapter title — Arabic (optional)'),
          leadEn: text('Key idea — English', true),
          leadAr: text('Key idea — Arabic', true),
          items: fields.array(fields.object({
            titleEn: text('Heading — English'), titleAr: text('Heading — Arabic'),
            bodyEn: text('Explanation — English', true), bodyAr: text('Explanation — Arabic', true),
          }), {label: 'Steps or decisions', itemLabel: props => props.fields.titleEn.value || 'Item'}),
        }), {label: 'Editorial presentation (optional; one per chapter)', itemLabel: props => props.fields.section.value}),
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
