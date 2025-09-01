module.exports = {
  cms: {
    name: 'MTech Store',
    description: 'Premium Electronics Store Management',
    url: 'https://maurya.enterprises',
  },
  
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      folder: '.',
      create: false,
      delete: false,
      fields: [
        {
          name: 'title',
          label: 'Page Title',
          widget: 'string',
        },
        {
          name: 'description',
          label: 'Page Description',
          widget: 'text',
        },
        {
          name: 'body',
          label: 'Page Content',
          widget: 'markdown',
        },
      ],
    },
    
    {
      name: 'products',
      label: 'Products',
      folder: 'products',
      create: true,
      delete: true,
      slug: '{{slug}}',
      fields: [
        {
          name: 'name',
          label: 'Product Name',
          widget: 'string',
        },
        {
          name: 'brand',
          label: 'Brand',
          widget: 'string',
        },
        {
          name: 'price',
          label: 'Price',
          widget: 'number',
        },
        {
          name: 'image',
          label: 'Product Image',
          widget: 'image',
        },
        {
          name: 'description',
          label: 'Description',
          widget: 'text',
        },
        {
          name: 'category',
          label: 'Category',
          widget: 'select',
          options: ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Gaming', 'Accessories'],
        },
        {
          name: 'featured',
          label: 'Featured Product',
          widget: 'boolean',
          default: false,
        },
        {
          name: 'inStock',
          label: 'In Stock',
          widget: 'boolean',
          default: true,
        },
      ],
    },
    
    {
      name: 'categories',
      label: 'Categories',
      folder: 'categories',
      create: true,
      delete: true,
      slug: '{{slug}}',
      fields: [
        {
          name: 'name',
          label: 'Category Name',
          widget: 'string',
        },
        {
          name: 'icon',
          label: 'Category Icon (emoji)',
          widget: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          widget: 'text',
        },
      ],
    },
  ],
};
