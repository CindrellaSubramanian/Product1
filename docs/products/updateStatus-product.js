module.exports = {
    post: {
      tags: ['Product CRUD operations'],
      description: 'Mark products as active or inactive by product IDs',
      operationId: 'updateProductStatus',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                productIds: {  
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Array of product ID to update',
                },
                status: {
                  type: 'number',
                  description: 'Status to set (0 for inactive, 1 for active)',
                },
                lang: {
                  type: 'string',
                  description: 'Language code for translation (e.g., en, fr)',
                },
                currency: {
                  type: 'string',
                  description: 'Currency code for translation (e.g., USD, EUR)',
                },
              },
              required: ['productIds', 'status'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Products updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        '404': {
          description: 'No products updated',
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
