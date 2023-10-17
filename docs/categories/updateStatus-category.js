module.exports = {
    post: {
      tags: ['Category CRUD operations'],
      description: 'Mark categories as active or inactive by category IDs',
      operationId: 'updateCategoryStatus',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                categoryId: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Array of category ID to update',
                },
                status: {
                  type: 'number',
                  description: 'Status to set (0 for inactive, 1 for active)',
                },
                lang: {
                  type: 'string',
                  description: 'Language code for translation (e.g., en, fr)',
                },
                currency: {
                  type: 'string',
                  description: 'Currency code for translation (e.g., USD, EUR)',
                },
              },
              required: ['categoryId', 'status'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Categories updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        '404': {
          description: 'No categories updated',
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
  