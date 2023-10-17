module.exports = {
    delete: {
      tags: ['Category CRUD operations'],
      description: 'Delete a category by ID',
      operationId: 'deleteCategoryById',
      parameters: [
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
      requestBody: {
        description: 'Category object to delete',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Category',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Category deleted successfully',
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
  