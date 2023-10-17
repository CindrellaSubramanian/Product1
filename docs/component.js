module.exports = {
  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          categoryName: { type: 'string', description: 'Name of the category', example: 'Dairy Product' },
          parentCategoryId: {
            type: 'string',
            format: 'objectId', // Custom format for objectId
            description: 'ID of the parent category (if applicable)',
            example: '615eb867e0cb5c001f540500',
          },
          description: { type: 'string', description: 'Description of the category', example: 'This category includes...' },
          status: {
            type: 'number',
            description: 'Status of the category (1 for active, 2 for inactive)',
            enum: [1, 2], // Allowed values
            example: 1,
          },
          image: {
            type: 'string',
            format: 'uri', // Check if it's a valid URI
            description: 'URL or reference to an image/icon',
            example: 'https://example.com/category.png',
          },
          order: { type: 'number', description: 'Order or priority of the category', default: 0, example: 1 },
          label: { type: 'string', description: 'Indicates if there is an offer', default: '', example: 'Offer Label' },
          createdAt: {
            type: 'string',
            format: 'date-time', // Check if it's a valid date-time format
            description: 'Timestamp of creation',
            example: '2023-10-15T14:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time', // Check if it's a valid date-time format
            description: 'Timestamp of last update',
            example: '2023-10-15T15:45:00Z',
          },
          type: {
            type: 'number',
            description: 'Type of category (1 for main category, 2 for subcategory)',
            enum: [1, 2], // Allowed values
            example: 1,
          },
          attribute: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                attributeTitle: {
                  type: 'string',
                  description: 'Title of the attribute',
                  example: 'Title 1',
                },
                item: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      attributeName: {
                        type: 'string',
                        description: 'Name of the attribute',
                        example: 'Battery',
                      },
                      groupName: {
                        type: 'string',
                        description: 'Group name of the attribute',
                        example: 'Group A',
                      },
                      type: {
                        type: 'array',  // Change the type to 'array' here
                        items:{
                          type: 'string',// Specify it's an array of strings
                          description: 'Type of the attribute', 
                          example: ['AAA', 'AA', 'Lithium'], // Example of an array of strings
                      },
                    },
                      componentType: {
                        type: 'string',
                        description: 'Type of component',
                        example: 'Textfield',
                      },
                      recommended: {
                        type: 'boolean',
                        description: 'Recommended attribute',
                        example: true,
                      },
                      required: {
                        type: 'boolean',
                        description: 'Required attribute',
                        example: true,
                      },
                    },
                  },
                },
              },
            },
          },

          attributeCondition: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                groupName: {
                  type: 'string',
                  description: 'Group name of the attribute condition',
                  example: 'Group A',
                },
                attributeName: {
                  type: 'string',
                  description: 'Name of the attribute',
                  example: 'Battery',
                },
                operator: {
                  type: 'string',
                  description: 'Comparison operator',
                  example: 'equals',
                },
                isShown: {
                  type: 'boolean',
                  description: 'Whether the attribute is shown',
                  example: true,
                },
                condition: {
                  type: 'string',
                  description: 'Type of the attribute condition',
                  example: 'true',
                },
              },
            },
          },
        },
        required: ['categoryName', 'status', 'attribute', 'attributeCondition'],
      },
      Coverage: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the coverage',
            example: 'CoverageName',
            minLength: 1, // Minimum length of 1 character
            maxLength: 100, // Maximum length of 100 characters
            pattern: '^[a-zA-Z0-9_]*$', // Allow only alphanumeric characters and underscores
          },
          description: {
            type: 'string',
            description: 'Description of the coverage',
            example: 'This coverage includes the test',
          },
          icon: {
            type: 'string',
            description: 'URL or reference to an icon',
            example: 'https://example.com/icon.png',
            format: 'uri', // Should be a valid URI
          },
          createdAt: {
            type: 'string',
            format: 'date-time', // Should be in a valid date-time format
            description: 'Timestamp of creation',
            example: '2023-10-15T14:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time', // Should be in a valid date-time format
            description: 'Timestamp of last update',
            example: '2023-10-15T15:45:00Z',
          },
        },
        required: ['name', 'icon'], // Required fields
      },
      Product: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Product code', example: 'P12345' },
          name: { type: 'string', description: 'Name of the product', example: 'Widget', minLength: 1, maxLength: 100 },
          variantName: { type: 'string', description: 'Variant name', example: 'Red' },
          variantSegregationBy: { type: 'string', description: 'Segregation type for variants', example: 'Color' },
          tags: { type: 'string', description: 'Descriptive tags', example: 'Electronics, Gadgets' },
          shortDescription: { type: 'string', description: 'Short product description', example: 'A high-quality widget' },
          longDescription: { type: 'string', description: 'Long product description', example: 'This widget is designed for...' },
          packedDate: { type: 'string', format: 'date', description: 'Packed date', example: '2023-10-15' },
          packingTime: { type: 'string', description: 'Packing time', example: '10:00 AM' },
          productCoverage: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of product coverages',
            example: ['Warranty', 'Delivery Guarantee'],
          },
          expiryDate: { type: 'string', description: 'Expiry date', example: '2024-12-31' },
          quantity: { type: 'number', description: 'Product quantity', example: 100, minimum: 0 },
          weight: { type: 'string', description: 'Product weight', example: '2.5 lbs' },
          stockStatus: { type: 'number', description: 'Stock status (1 for stockIn, 2 for stockOut)', example: 1, enum: [0, 1, 2] },
          status: { type: 'number', description: 'Product status (1 for active, 2 for inactive)', example: 1, enum: [0, 1, 2] },
          availableCount: { type: 'number', description: 'Available product count', example: 50, minimum: 0 },
          type: {
            type: 'string',
            description: 'Product type (e.g., food, clothing, books, grocery)',
            example: 'Electronics',
            enum: ['food', 'clothing', 'books', 'grocery'],
          },
          sellingPrice: { type: 'number', description: 'Selling price', example: 49.99, minimum: 0 },
          discountPrice: { type: 'number', description: 'Discount price', example: 39.99, minimum: 0 },
          mrp: { type: 'number', description: 'Maximum retail price (MRP)', example: 59.99, minimum: 0 },
          currency: { type: 'string', description: 'Currency', example: 'USD' },
          sku: { type: 'string', description: 'SKU (Stock Keeping Unit)', example: 'SKU12345' },
          brand: { type: 'string', description: 'Brand name', example: 'ABC Electronics' },
          specification: { type: 'object', description: 'Product specifications (e.g., size, color, dimension)', example: { size: 'Small', color: 'Red' } },
          vendorId: { type: 'string', description: 'Vendor ID', example: 'V12345' },
          vendorName: { type: 'string', description: 'Vendor name', example: 'XYZ Retailers' },
          rating: { type: 'number', description: 'Product rating', example: 4.5, minimum: 0, maximum: 5 },
          image: {
            type: 'array',
            items: { type: 'string' },
            description: 'Product images',
            example: ['image1.jpg', 'image2.jpg'],
          },
          bannerImage: {
            type: 'array',
            items: { type: 'string' },
            description: 'Product banner images',
            example: ['banner1.jpg', 'banner2.jpg'],
          },
          barCode: { type: 'string', description: 'Product barcode', example: '1234567890' },
          categoryId: { type: 'string', description: 'Category ID', example: 'C123' },
          categoryName: { type: 'string', description: 'Category name', example: 'Electronics' },
          subCategoryId: { type: 'string', description: 'Subcategory ID', example: 'SC456' },
          subCategoryName: { type: 'string', description: 'Subcategory name', example: 'Gadgets' },
          createdAt: { type: 'string', format: 'date-time', description: 'Timestamp of creation', example: '2023-10-15T14:30:00Z' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Timestamp of last update', example: '2023-10-15T15:45:00Z' },
          attribute: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                attributeTitle: {
                  type: 'string',
                  description: 'Title of the attribute',
                  example: 'Title 1',
                },
                item: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      attributeName: {
                        type: 'string',
                        description: 'Name of the attribute',
                        example: 'Battery',
                      },
                      groupName: {
                        type: 'string',
                        description: 'Group name of the attribute',
                        example: 'Group A',
                      },
                      type: {
                        type: 'array',  // Change the type to 'array' here
                        items:{
                          type: 'string',// Specify it's an array of strings
                          description: 'Type of the attribute', 
                          example: ['AAA', 'AA', 'Lithium'], // Example of an array of strings
                      },
                    },
                      componentType: {
                        type: 'string',
                        description: 'Type of component',
                        example: 'Textfield',
                      },
                      recommended: {
                        type: 'boolean',
                        description: 'Recommended attribute',
                        example: true,
                      },
                      required: {
                        type: 'boolean',
                        description: 'Required attribute',
                        example: true,
                      },
                    },
                  },
                },
              },
            },
          },

          attributeCondition: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                groupName: {
                  type: 'string',
                  description: 'Group name of the attribute condition',
                  example: 'Group A',
                },
                attributeName: {
                  type: 'string',
                  description: 'Name of the attribute',
                  example: 'Battery',
                },
                operator: {
                  type: 'string',
                  description: 'Comparison operator',
                  example: 'equals',
                },
                isShown: {
                  type: 'boolean',
                  description: 'Whether the attribute is shown',
                  example: true,
                },
                condition: {
                  type: 'string',
                  description: 'Type of the attribute condition',
                  example: 'true',
                },
              },
            },
          },
        },
        required: [
          'productName',
          'productCoverage',
          'type',
          'sellingPrice',
          'rating',
          'attribute', 
          'attributeCondition'
        ],
      },
    },
  },
};
