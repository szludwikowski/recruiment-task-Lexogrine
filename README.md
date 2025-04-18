# Recruitment Task - React Landing Page

A modern React application featuring a responsive landing page with authentication, pricing tables, and animations.

## Features

- **Responsive Hero Section**: Adapts well to all popular screen resolutions (desktop/mobile)
- **Authentication System**: 
  - Form validation
  - Simulated API responses with predefined input combinations
  - Error handling and user feedback via toast notifications
  - Anti-abuse protection for the Sign Up button
- **Pricing Tables**: Displays pricing options for logged-in users
- **Animations**: Implemented using Framer Motion (motion.dev) for component transitions and cursor interactions

## Technologies

- React 19
- TypeScript
- Vite
- SCSS Modules for styling
- React Router for navigation
- React Context API for authentication state management
- Framer Motion for animations
- React Toastify for notifications

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd recru-task
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run preview` - Preview the built application
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code using Prettier

## Authentication Service

The application includes a simulated authentication service with the following features:

### Sign Up

The sign-up process validates:
- Email format
- Password length (minimum 6 characters)
- Terms of service agreement

The following predefined scenarios are available:

1. **Success**: Any valid email (not in the blocked domains or existing users lists)
2. **Error - Blocked Domain**: Emails from domains: "blocked.com", "spam.com", "temp.com"
3. **Error - Existing User**: Email "user@example.com"

### Sign In

A simulated sign-in process with:
- Random delay to simulate network request
- Successful login with credentials: 
  - Email: user@example.com
  - Password: password123

## Project Structure

- `src/components/layout`: Layout components (Container, Navigation)
- `src/components/sections`: Page sections (Hero, PricingTable)
- `src/components/ui`: Reusable UI components (Button, Form, Input, Link)
- `src/context`: React context including AuthContext for authentication state
- `src/hooks`: Custom hooks for forms and animations
- `src/routes`: Application routes/pages
- `src/services`: API service mocks
- `src/styles`: Global styles and variables

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens

## Task Implementation Notes

The implementation focuses on:
1. Responsive design that looks good on all screen sizes
2. Form validation and error handling
3. Simulated API requests with predefined responses
4. Authentication state management using React Context
5. Showing Pricing Table component when user is logged in
6. Animations for component entry/exit and cursor interactions
