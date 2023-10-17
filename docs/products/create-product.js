module.exports = {
    post: {
      tags: ['Product CRUD operations'],
      description: 'Create a new Product',
      operationId: 'createProduct',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Product created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
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
  