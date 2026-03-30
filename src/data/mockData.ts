import { Project, SRSData, APIEndpoint, DatabaseTable } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with payment integration',
    createdAt: '2024-03-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Healthcare Management System',
    description: 'Patient management and appointment scheduling system',
    createdAt: '2024-03-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Social Media Analytics',
    description: 'Real-time analytics dashboard for social media metrics',
    createdAt: '2024-03-22',
    status: 'completed',
  },
];

export const mockSRSData: SRSData = {
  id: '1',
  projectName: 'E-Commerce Platform',
  description: 'A comprehensive online shopping platform that enables users to browse products, manage shopping carts, process payments, and track orders in real-time.',
  functionalRequirements: [
    'User authentication and authorization with OAuth 2.0',
    'Product catalog with search, filtering, and sorting capabilities',
    'Shopping cart management with real-time price calculations',
    'Secure payment processing using Stripe/PayPal integration',
    'Order tracking and history management',
    'Admin dashboard for inventory and order management',
    'Email notifications for order confirmations and updates',
    'Product reviews and ratings system',
  ],
  nonFunctionalRequirements: [
    'System must handle 10,000 concurrent users',
    'Page load time must be under 2 seconds',
    'Payment processing must be PCI DSS compliant',
    '99.9% uptime SLA',
    'Data encryption at rest and in transit',
    'Mobile-responsive design for all devices',
    'WCAG 2.1 Level AA accessibility compliance',
  ],
  systemArchitecture: 'Microservices architecture with API Gateway, using React frontend, Node.js backend, PostgreSQL database, Redis cache, and AWS cloud infrastructure.',
  createdAt: '2024-03-15',
};

export const mockAPIEndpoints: APIEndpoint[] = [
  {
    id: '1',
    method: 'GET',
    path: '/api/v1/products',
    description: 'Retrieve list of all products with pagination',
    parameters: [
      { name: 'page', type: 'number', required: false },
      { name: 'limit', type: 'number', required: false },
      { name: 'category', type: 'string', required: false },
    ],
    response: '{ "products": [], "total": 0, "page": 1, "totalPages": 1 }',
  },
  {
    id: '2',
    method: 'POST',
    path: '/api/v1/products',
    description: 'Create a new product',
    parameters: [
      { name: 'name', type: 'string', required: true },
      { name: 'price', type: 'number', required: true },
      { name: 'description', type: 'string', required: true },
      { name: 'category', type: 'string', required: true },
    ],
    response: '{ "id": "string", "name": "string", "price": 0, "createdAt": "date" }',
  },
  {
    id: '3',
    method: 'GET',
    path: '/api/v1/orders/:id',
    description: 'Get order details by ID',
    parameters: [
      { name: 'id', type: 'string', required: true },
    ],
    response: '{ "id": "string", "items": [], "total": 0, "status": "string" }',
  },
  {
    id: '4',
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'Authenticate user and generate JWT token',
    parameters: [
      { name: 'email', type: 'string', required: true },
      { name: 'password', type: 'string', required: true },
    ],
    response: '{ "token": "string", "user": {...}, "expiresIn": 3600 }',
  },
  {
    id: '5',
    method: 'PUT',
    path: '/api/v1/cart/:id',
    description: 'Update cart item quantity',
    parameters: [
      { name: 'id', type: 'string', required: true },
      { name: 'quantity', type: 'number', required: true },
    ],
    response: '{ "cart": {...}, "total": 0 }',
  },
  {
    id: '6',
    method: 'DELETE',
    path: '/api/v1/products/:id',
    description: 'Delete a product by ID',
    parameters: [
      { name: 'id', type: 'string', required: true },
    ],
    response: '{ "success": true, "message": "Product deleted" }',
  },
];

export const mockDatabaseTables: DatabaseTable[] = [
  {
    id: '1',
    name: 'users',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false },
      { name: 'password_hash', type: 'VARCHAR(255)', nullable: false },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: true },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false },
    ],
    relations: [
      { table: 'orders', type: 'one-to-many' },
      { table: 'cart', type: 'one-to-many' },
    ],
  },
  {
    id: '2',
    name: 'products',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false },
      { name: 'description', type: 'TEXT', nullable: true },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'category', type: 'VARCHAR(100)', nullable: false },
      { name: 'stock_quantity', type: 'INTEGER', nullable: false },
      { name: 'image_url', type: 'VARCHAR(500)', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
    ],
    relations: [
      { table: 'order_items', type: 'one-to-many' },
      { table: 'cart_items', type: 'one-to-many' },
    ],
  },
  {
    id: '3',
    name: 'orders',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'user_id', type: 'UUID', nullable: false },
      { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false },
      { name: 'shipping_address', type: 'TEXT', nullable: false },
      { name: 'payment_method', type: 'VARCHAR(50)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
    ],
    relations: [
      { table: 'users', type: 'many-to-one' },
      { table: 'order_items', type: 'one-to-many' },
    ],
  },
  {
    id: '4',
    name: 'order_items',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'order_id', type: 'UUID', nullable: false },
      { name: 'product_id', type: 'UUID', nullable: false },
      { name: 'quantity', type: 'INTEGER', nullable: false },
      { name: 'price_at_purchase', type: 'DECIMAL(10,2)', nullable: false },
    ],
    relations: [
      { table: 'orders', type: 'many-to-one' },
      { table: 'products', type: 'many-to-one' },
    ],
  },
];

export const mockFlowchartCode = `graph TB
    Start([User Visits Platform]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Register Page]
    Auth -->|Yes| Home[Home Dashboard]

    Login --> ValidateCreds{Valid Credentials?}
    ValidateCreds -->|No| Error1[Show Error Message]
    ValidateCreds -->|Yes| Home
    Error1 --> Login

    Home --> Browse[Browse Products]
    Browse --> Search{Search/Filter?}
    Search -->|Yes| ApplyFilters[Apply Filters]
    Search -->|No| DisplayProducts[Display All Products]
    ApplyFilters --> DisplayProducts

    DisplayProducts --> SelectProduct[Select Product]
    SelectProduct --> ViewDetails[View Product Details]
    ViewDetails --> AddCart{Add to Cart?}

    AddCart -->|No| Browse
    AddCart -->|Yes| UpdateCart[Update Shopping Cart]
    UpdateCart --> ContinueShopping{Continue Shopping?}

    ContinueShopping -->|Yes| Browse
    ContinueShopping -->|No| Checkout[Proceed to Checkout]

    Checkout --> ReviewOrder[Review Order Details]
    ReviewOrder --> SelectPayment[Select Payment Method]
    SelectPayment --> ProcessPayment{Payment Successful?}

    ProcessPayment -->|No| PaymentError[Payment Error]
    ProcessPayment -->|Yes| CreateOrder[Create Order]
    PaymentError --> SelectPayment

    CreateOrder --> SendConfirmation[Send Confirmation Email]
    SendConfirmation --> OrderTracking[Order Tracking Page]
    OrderTracking --> End([Order Complete])

    style Start fill:#10b981
    style End fill:#10b981
    style Error1 fill:#ef4444
    style PaymentError fill:#ef4444
    style CreateOrder fill:#3b82f6
    style ProcessPayment fill:#f59e0b`;

export const mockChatMessages = [
  {
    id: '1',
    role: 'assistant' as const,
    content: 'Hello! I\'m your AI assistant. I can help you with code generation, architecture decisions, debugging, and best practices. What would you like to work on today?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    role: 'user' as const,
    content: 'Can you help me design a user authentication system?',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: '3',
    role: 'assistant' as const,
    content: 'I\'d be happy to help! For a modern authentication system, I recommend:\n\n1. **JWT-based authentication** with access and refresh tokens\n2. **OAuth 2.0** for social login integration\n3. **Secure password hashing** using bcrypt or Argon2\n4. **Rate limiting** to prevent brute force attacks\n5. **Two-factor authentication** for enhanced security\n\nWould you like me to generate code for any of these components?',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
  },
];
