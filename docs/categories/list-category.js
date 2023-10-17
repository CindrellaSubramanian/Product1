
module.exports = {
    get: {
      tags: ['Category CRUD operations'],
      description: 'Get all categories',
      operationId: 'getAllCategories',
      parameters: [
        {
          name: 'type',
          in: 'query',
          description: 'Category type (0 for all, positive integers for specific type)',
          required: false,
          schema: {
            type: 'integer', // Set the type to 'integer' for the 'type' parameter
            example: 0,
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
                    example: 'Success',
                  },
                  data: {
                    type: 'array',
                    description: 'Array of category objects',
                    items: {
                      $ref: '#/components/schemas/Category',
                    },
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
                    example: 'Error retrieving categories',
                  },
                  data: {
                    type: 'array',
                    description: 'Empty array',
                    items: {},
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  