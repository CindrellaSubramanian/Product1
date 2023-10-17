module.exports = {
    get: {
      tags: ['Product CRUD operations'],
      description: 'Get a Product by ID',
      operationId: 'getProductById',
      parameters: [
        {
          name: 'productId',
          in: 'query',
          description: 'ID of the Product to retrieve',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Product retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        '404': {
          description: 'Product not found',
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
  