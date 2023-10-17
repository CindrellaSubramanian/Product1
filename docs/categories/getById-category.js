module.exports = {
    get: {
      tags: ['Category CRUD operations'],
      description: 'Get a category by ID',
      operationId: 'getCategoryById',
      parameters: [
        {
          name: 'categoryId',
          in: 'query',
          description: 'ID of the category to retrieve',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'lang',
          in: 'query',
          description: 'Language code for translation (e.g., en, fr)',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'currency',
          in: 'query',
          description: 'Currency code for translation (e.g., USD, EUR)',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        '404': {
          description: 'Category not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        '500': {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  };
  