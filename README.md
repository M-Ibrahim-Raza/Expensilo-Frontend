# Expensilo

A modern expense tracking application built with Next.js 15 and FastAPI, designed to help users manage their income and expenses efficiently.

## Features

- **JWT Authentication** – Secure user authentication using JSON Web Tokens.
- **Protected Routes** - Secure pages requiring authentication
- **Sign-Up & Login** – Register new users and login with validated credentials.
- **Expense Tracking** - Add and manage your expenses
- **Add Expense / Income** – Create new transactions with category, title, amount, and details.
- **Update & Remove Transactions** – Edit or delete existing expense/income entries.
- **Summary Component** – View total income, total expenses, and current balance with color-coded indicators.
- **Date Period Filter** – Filter transactions by predefined periods (Today, Yesterday, This Week, Last Week, This Month, Last Month) or a custom date range.
- **Responsive Design** - Works seamlessly across all devices

## Tech Stack

### Frontend

- **Next.js** 15.5.4 - React framework for production
- **React** - UI library
- **Tailwind CSS** - Styling

### Backend

- **FastAPI** - High-performance Python web framework

## Project Structure

```
expensilo/
├── api/                          # API integration layer
│   ├── auth.js                   # Authentication API calls
│   └── transaction.js            # Transaction API calls
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes group
│   │   ├── components/           # Auth-specific components
│   │   │   ├── BrandSection.jsx
│   │   │   ├── CardHeading.jsx
│   │   │   └── FormInput.jsx
│   │   ├── layout.jsx            # Auth layout wrapper
│   │   ├── login/
│   │   │   └── page.jsx
│   │   └── signup/
│   │       └── page.jsx
│   ├── (protected)/              # Protected routes group
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── AddExpenseButton.jsx
│   │   │   │   ├── AddIncomeButton.jsx
│   │   │   │   ├── TransactionCard.jsx
│   │   │   │   └── TransactionModel.jsx
│   │   │   └── page.jsx
│   │   └── layout.jsx            # Protected routes layout
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
├── components/                   # Shared components
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── forms/
│   ├── layout/
│   │   └── NavBar.jsx
│   └── ui/
│       └── LoadingSpinner.jsx
├── constants/                    # Application constants
├── styles/                       # Additional styles
└── utils/                        # Utility functions
    └── api.js                    # API configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Python 3.8+ (for FastAPI backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expensilo
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Set up and run the FastAPI backend**

   Follow the backend setup instructions in your FastAPI server repository.

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

### Public Routes

- `/login` - User login page
- `/signup` - User registration page

### Protected Routes

- `/home` - Main dashboard with transactions

## Development

### Route Groups

This project uses Next.js 15's route groups feature:

- `(auth)` - Authentication-related pages
- `(protected)` - Pages requiring authentication

### Components Organization

- **app/\*/components/** - Route-specific components
- **components/** - Shared, reusable components
- **components/ui/** - UI primitives and common elements

## Authentication

The application uses a custom authentication system with protected routes. The `ProtectedRoute` component handles route protection and redirects unauthorized users to the login page.

## Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

**Note:** Make sure your FastAPI backend server is running before starting the Next.js application to ensure full functionality.
