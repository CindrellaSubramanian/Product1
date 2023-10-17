module.exports = {
    get: {
      tags: ['Product CRUD operations'],
      description: 'List all Products',
      operationId: 'listProducts',
      responses: {
        '200': {
          description: 'Products retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product',
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
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  };
  