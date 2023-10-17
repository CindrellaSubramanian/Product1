module.exports = {
    post: {
      tags: ['Product CRUD operations'],  
      description: 'Bulk upload products from Excel or CSV file',
      operationId: 'bulkUploadProducts',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
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
              required: ['file'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Products uploaded successfully',
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
