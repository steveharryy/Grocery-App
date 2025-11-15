# Backend Setup Guide

## Overview
The backend has been configured with proper database integration using Supabase and API routes for both Admin and Seller dashboards.

## Environment Variables Required

You already have these in your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Additionally, you need to add these for Clerk authentication:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

And for Prisma/Neon database:
```
DATABASE_URL=your_neon_postgres_connection_string
DIRECT_URL=your_neon_direct_connection_string
```

## API Routes Created

### Admin Routes

#### 1. `/api/admin/dashboard` (GET)
Fetches admin dashboard data including:
- Total products count
- Total revenue
- Total orders count
- Total stores count
- All orders for the chart

#### 2. `/api/admin/stores` (GET, PATCH)
**GET**: Fetches stores list
- Query param: `?status=pending` to filter pending stores
- Returns stores with user information

**PATCH**: Updates store status or isActive
```json
{
  "storeId": "store_id",
  "isActive": true, // or
  "status": "approved" // or "rejected"
}
```

#### 3. `/api/admin/coupons` (GET, POST, DELETE)
**GET**: Fetches all coupons

**POST**: Creates a new coupon
```json
{
  "code": "NEW20",
  "description": "20% Off for New Users",
  "discount": 20,
  "forNewUser": true,
  "forMember": false,
  "isPublic": false,
  "expiresAt": "2026-12-31T00:00:00.000Z"
}
```

**DELETE**: Deletes a coupon
- Query param: `?code=COUPON_CODE`

### Store Routes

#### 1. `/api/store/dashboard` (GET)
Fetches seller dashboard data including:
- Total products count
- Total earnings
- Total orders count
- All ratings with user and product info

Requires authentication (uses Clerk's `auth()`)

#### 2. `/api/store/products` (GET, PATCH)
**GET**: Fetches all products for the authenticated seller's store

**PATCH**: Updates product stock status
```json
{
  "productId": "product_id",
  "inStock": true
}
```

#### 3. `/api/store/orders` (GET, PATCH)
**GET**: Fetches all orders for the authenticated seller's store
- Includes customer, address, and order items with products

**PATCH**: Updates order status
```json
{
  "orderId": "order_id",
  "status": "PROCESSING" // or "SHIPPED", "DELIVERED"
}
```

## Updated Pages

### Admin Dashboard (`/admin`)
- Fetches real-time data from `/api/admin/dashboard`
- Displays stats cards and orders chart
- Shows error toasts on failure

### Admin Stores (`/admin/stores`)
- Fetches approved stores from `/api/admin/stores`
- Toggle store active/inactive status
- Updates reflect immediately in UI

### Admin Approve Stores (`/admin/approve`)
- Fetches pending stores from `/api/admin/stores?status=pending`
- Approve or reject stores
- Removes from list after action

### Admin Coupons (`/admin/coupons`)
- Fetches all coupons from `/api/admin/coupons`
- Add new coupons with form
- Delete coupons with confirmation

### Store Dashboard (`/store`)
- Fetches dashboard stats from `/api/store/dashboard`
- Displays product, earnings, orders stats
- Shows customer reviews/ratings

### Store Manage Products (`/store/manage-product`)
- Fetches all products from `/api/store/products`
- Toggle product stock status
- Real-time UI updates

### Store Orders (`/store/orders`)
- Fetches orders from `/api/store/orders`
- Update order status dropdown
- View order details modal

## Database Setup

The existing Prisma schema is already configured with all necessary models:
- User
- Store
- Product
- Order
- OrderItem
- Rating
- Address
- Coupon

Run these commands to set up the database:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database with dummy data
npx prisma db seed
```

## Clerk Authentication Setup

1. Create a Clerk account at https://clerk.com
2. Create a new application
3. Get your publishable and secret keys
4. Add webhook endpoint for user sync:
   - Endpoint: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`

## Supabase Client Library

The Supabase client is configured in `lib/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Testing the Backend

1. Start the development server:
```bash
npm run dev
```

2. Navigate to:
   - Admin Dashboard: `http://localhost:3000/admin`
   - Store Dashboard: `http://localhost:3000/store`

3. The pages will fetch data from the API routes
4. If database is empty, you'll see zero counts initially

## Next Steps

1. Add your Clerk API keys to `.env`
2. Add your Neon database connection strings to `.env`
3. Run `npx prisma migrate dev` to create database tables
4. Seed the database with some test data
5. Test all the dashboard features

## Error Handling

All API routes include:
- Try-catch blocks for error handling
- Proper HTTP status codes
- Console error logging
- User-friendly error messages

All pages include:
- Loading states
- Error toast notifications
- Proper error boundaries

## Security Notes

- All store routes require Clerk authentication
- Admin routes should add authentication middleware
- Database queries use Prisma's built-in SQL injection protection
- CORS is not configured (same-origin only)
