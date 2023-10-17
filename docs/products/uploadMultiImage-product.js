module.exports = {
    post: {
      tags: ['Product CRUD operations'],
      description: 'Upload multiple images',
      operationId: 'uploadMultiImages',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'binary',
                  },
                  description: 'Array of image files to upload (up to 10)',
                },
              },
              required: ['images'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Images uploaded successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code (1 for success, -1 for error)',
                    example: 1,
                  },
                  message: {
                    type: 'string',
                    description: 'Status message',
                    example: 'Images uploaded successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      imageUrls: {
                        type: 'array',
                        description: 'Array of image URLs',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                  },
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
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code (-1 for error)',
                    example: -1,
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Invalid request or too many images',
                  },
                  data: {
                    type: 'null',
                    description: 'Null data',
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code (-1 for error)',
                    example: -1,
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Error uploading images',
                  },
                  data: {
                    type: 'null',
                    description: 'Null data',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  