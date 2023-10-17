module.exports = {
    get: {
      tags: ['Coverage CRUD operations'],
      description: 'Get a Coverage by ID',
      operationId: 'getCoverageById',
      parameters: [
        {
          name: 'coverageId',
          in: 'query',
          description: 'ID of the Coverage to retrieve',
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
          description: 'Coverage retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Coverage',
              },
            },
          },
        },
        '404': {
          description: 'Coverage not found',
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
  