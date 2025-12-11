# LuxuryTech — E-commerce Web App (React + Firebase + Supabase)

Live demo: https://luxurytech.vercel.app  
Repository: https://github.com/m-waleed-saeed/E-commere-with-Firebase

## Summary
LuxuryTech is a modern e-commerce web application showcasing a premium "black tech" UI and complete full-stack functionality. Built to demonstrate secure authentication, data-driven product management, image storage, and an admin dashboard with full CRUD and order management.

## Tech stack
- Frontend: React (functional components, hooks)  
- Styling: Tailwind / custom CSS (or Ant Design used where applicable)  
- Authentication: Firebase Authentication (email/password)  
- Database: Firebase Firestore (products, orders, users, newsletters)  
- Storage: Supabase Storage (product images, multi-image per product)  
- Hosting: Vercel (frontend deployment)  
- Optional: Payment flow placeholder (add Stripe/PayPal as next step)

## Key features
- Secure user registration & login (Firebase Auth)
- Product catalog with product detail pages
- Cart: add/remove/update quantities
- Checkout flow that records orders to Firestore
- Admin panel:
  - Full CRUD for products (create, read, update, delete)
  - Upload multiple images per product (Supabase)
  - Manage orders (status updates)
  - Manage users and newsletters
- Responsive, premium black-tech UI and UX
- Deployed demo on Vercel

## Project structure (high-level)
