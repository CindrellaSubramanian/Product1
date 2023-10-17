module.exports = {
    post: {
      tags: ['Coverage CRUD operations'],
      description: 'Create a new Coverage',
      operationId: 'createCoverage',
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
        '201': {
          description: 'Coverage created successfully',
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
  