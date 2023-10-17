module.exports = {
    get: {
      tags: ['Coverage CRUD operations'],
      description: 'List all Coverages',
      operationId: 'listCoverages',
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
      responses: {
        '200': {
          description: 'Coverages retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Coverage',
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
  