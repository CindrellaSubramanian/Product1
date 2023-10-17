// module.exports = {
//     post: {
//       tags: ['Category CRUD operations'],
//       description: 'Bulk upload categories from Excel or CSV file',
//       operationId: 'bulkUploadCategories',
//       requestBody: {
//         content: {
//           'multipart/form-data': {
//             schema: {
//               type: 'object',
//               properties: {
//                 file: {
//                   type: 'string',
//                   format: 'binary',
//                 },
//                 lang: {
//                   type: 'string',
//                   description: 'Language code for translation (e.g., en, fr)',
//                 },
//                 currency: {
//                   type: 'string',
//                   description: 'Currency code for translation (e.g., USD, EUR)',
//                 },
//               },
//               required: ['file'],
//             },
//           },
//         },
//       },
//       responses: {
//         '200': {
//           description: 'Categories uploaded successfully',
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'array',
//                 items: {
//                   $ref: '#/components/schemas/Category',
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
      description: 'Bulk upload categories from Excel or CSV file',
      operationId: 'bulkUploadCategories',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  description: 'Excel or CSV file to upload',
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
          description: 'Categories uploaded successfully',
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
                    example: 'Data uploaded successfully',
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
                    description: 'Status code (-2 for unsupported file type, -1 for other errors)',
                    example: -2,
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Unsupported file type',
                  },
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
                    example: 'Error uploading data',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  