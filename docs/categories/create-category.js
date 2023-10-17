module.exports = {
    post: {
      tags: ['Category CRUD operations'],
      description: 'Create a new category',
      operationId: 'createCategory',
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
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Category',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Category created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code (1 for success, -1 for error)',
                    example: 1,
                  },
                  message: {
                    type: 'string',
                    description: 'Status message',
                    example: 'Category created successfully',
                  },
                  data: {
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code (1 for success, -1 for error)',
                    example: -1,
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Error creating category',
                  },
                  data: {},
                },
              },
            },
          },
        },
      },
    },
};
