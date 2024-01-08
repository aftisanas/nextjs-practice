# Acme Dashboard

Welcome to the documentation for the Next.js application! This project is designed to be a web application with features such as a dashboard, invoices management, customer information, and user authentication.

## Table of Contents
1. [Folder Structure](#folder-structure)
2. [Dashboard Page](#dashboard-page)
3. [Invoices Page](#invoices-page)
4. [Invoice Create Form](#invoice-create-form)
5. [Invoice Edit Form](#invoice-edit-form)
6. [Customers Page](#customers-page)
7. [Authentication](#authentication)
8. [Sidebar Component](#sidebar-component)
9. [Routing](#routing)
10. [Authentication Logic](#authentication-logic)
11. [Navigation](#navigation)

## Folder Structure
/dashboard
    /(overview)
        page.tsx
        loading.tsx
    /customers
        page.tsx
    /invoices
        /[id]
            /edit
                page.tsx
        /create
            page.tsx
        page.tsx
        error.tsx
    layout.tsx
/login
    pages.tsx
/lib
    actions.ts
    data.ts
    definitions.ts
    placeholder-data.js
    utils.ts
layout.tsx
page.tsx

## Dashboard Page
- Collected, Pending, Total Invoices, Total Customers cards.
- Recent Revenue charts.
- Latest Invoices list.

## Invoices Page
- List of invoices with columns: Customer, Email, Amount, Date, Status, and Action (Edit and Delete buttons).
- Search functionality.
- Create Invoice button that redirects to the invoice create form.
- Pagination.

## Invoice Create Form
- Form for creating a new invoice.

## Invoice Edit Form
- Form for editing an existing invoice.

## Customers Page
- List of customers with columns: Name, Email, Total Invoices, Total Pending, Total Paid.
- Search functionality.

## Authentication
- Login page.

## Sidebar Component
- Links to Dashboard, Invoices, Customers, and Sign Out.

## Routing
- Set up your routing in the `pages` directory to reflect the structure mentioned above.

## Authentication Logic
- Use the `next-auth` library for authentication.

## Navigation
- Use Next.js `Link` component for navigation.
- Redirect users after authentication.
