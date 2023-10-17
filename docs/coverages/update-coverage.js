module.exports = {
    post: {
      tags: ['Coverage CRUD operations'],
      description: 'Update a Coverage by ID',
      operationId: 'updateCoverage',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Coverage',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Coverage updated successfully',
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
  