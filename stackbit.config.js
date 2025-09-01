module.exports = {
  contentSources: [
    {
      provider: 'git',
      rootDir: '.',
      models: {
        home: {
          file: 'index.html',
          fields: {
            heroTitle: { selector: 'section.hero h1', type: 'text' },
            heroSubtitle: { selector: 'section.hero p', type: 'text' },
            ctaText: { selector: 'section.hero .hero-btn', type: 'text' }
          }
        },
        products: {
          folder: 'products',
          glob: '*.md',
          fields: {
            name: { type: 'string' },
            brand: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'text' },
            image: { type: 'string' },
            category: { type: 'string' }
          }
        },
        categories: {
          folder: 'categories',
          glob: '*.md',
          fields: {
            name: { type: 'string' },
            icon: { type: 'string' },
            description: { type: 'text' }
          }
        }
      },
      pageModels: ['home']
    }
  ]
};
