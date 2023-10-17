module.exports = {
    delete: {
      tags: ['Coverage CRUD operations'],
      description: 'Delete a Coverage by ID',
      operationId: 'deleteCoverage',
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
          description: 'Coverage deleted successfully',
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
  