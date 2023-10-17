// module.exports = {
//     post: {
//       tags: ['Category CRUD operations'],
//       description: 'Upload an image',
//       operationId: 'uploadImage',
//       requestBody: {
//         content: {
//           'multipart/form-data': {
//             schema: {
//               type: 'object',
//               properties: {
//                 image: {
//                   type: 'string',
//                   format: 'binary',
//                 },
//               },
//               required: ['image'],
//             },
//           },
//         },
//       },
//       responses: {
//         '200': {
//           description: 'Image uploaded successfully',
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 properties: {
//                   imageUrl: {
//                     type: 'string',
//                   },
//                 },
//               },
//             },
//           },
//         },
//         '400': {
//           description: 'Bad request',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error',
//               },
//             },
//           },
//         },
//         '500': {
//           description: 'Server error',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error',
//               },
//             },
//           },
//         },
//       },
//     },
//   };
  

module.exports = {
    post: {
      tags: ['Category CRUD operations'],
      description: 'Upload an image',
      operationId: 'uploadImage',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Image file to upload',
                },
              },
              required: ['image'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Image uploaded successfully',
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
                    example: 'Image uploaded successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      imageUrl: {
                        type: 'string',
                        description: 'URL of the uploaded image',
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
                    example: 'No image uploaded',
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
                    example: 'Internal server error',
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
  