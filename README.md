# Hope Link — Admin Dashboard

A full-featured administrative frontend for the **Hope Link** NGO management platform. Built with Next.js and TypeScript, this dashboard gives platform administrators complete control over charities, users, requests, notifications, reports, and platform settings.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Authentication & Security](#authentication--security)
- [API Integration](#api-integration)
- [Components](#components)

---

## Overview

Hope Link Admin Dashboard is a Next.js App Router application that serves as the administrative control panel for the Hope Link NGO platform. It provides:

- A secure, role-based admin interface
- Real-time metrics and analytics
- NGO/charity registration & verification workflows
- Full user lifecycle management
- A rich notifications system
- Granular platform configuration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios (with token-refresh interceptor) |
| Charts | Recharts |
| Icons | Heroicons v2 |
| State Management | React Context API |
| Font | Inter (@fontsource/inter) |
| Linting | ESLint (eslint-config-next) |

---

## Project Structure

```
admin-frontend/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Public auth routes
│   │   ├── login/              # Login page
│   │   └── layout.tsx
│   ├── (dashboard)/            # Protected routes (require auth)
│   │   ├── dashboard/          # Main dashboard & metrics
│   │   ├── ngo/                # NGO list & detail pages
│   │   │   └── [id]/
│   │   ├── users/              # User list & detail pages
│   │   │   └── [id]/
│   │   ├── requests/           # Registration & verification requests
│   │   ├── notifications/      # Admin notification center
│   │   ├── reports/            # Analytics & reporting
│   │   ├── profile/            # Admin profile management
│   │   ├── settings/           # Platform settings & sub-pages
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── components/                 # Reusable UI components
│   ├── layout/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   └── Sidebar.tsx         # Side navigation menu
│   ├── ConfirmModal.tsx
│   ├── CustomDatePicker.tsx
│   ├── CustomDropdown.tsx
│   ├── Fileuploader.tsx
│   ├── ProtectedRoute.tsx
│   └── logo.tsx
│
├── context/
│   └── UserContext.tsx         # Global authenticated user state
│
├── lib/
│   └── axios.ts                # Axios instance with auth interceptors
│
├── public/                     # Static assets
├── proxy.ts                    # Next.js middleware (auth redirect)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running instance of the Hope Link backend API

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd admin-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL="http://localhost:5000"

# Supabase storage base URL (used for image/file CDN)
NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL for all backend API calls |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL for media storage |

---

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run ESLint
npm run lint
```

---

## Features

### Dashboard
- Platform-wide KPI cards (pending requests, active users, active projects)
- Registration trends chart (7-month line chart)
- NGO distribution by city (bar chart)
- Recent admin decisions table
- Pending actions panel with quick-review shortcuts

### NGO / Charity Management
- Paginated list with search, status filter, category filter, and city filter
- Add new charity organization
- Detailed charity profile page with project listings
- Edit charity information
- Status management (active / suspended / pending)

### User Management
- Full user list with search and multi-filter support
- Add new user with role assignment
- Individual user detail pages including activity history
- Edit user info and manage account status
- Delete user with confirmation

### Request Management
- Tabbed view for **Registration Requests** and **Verification Requests**
- Review supporting documents inline
- Approve or decline requests with reviewer notes
- Filter by status (pending / approved / declined)

### Notifications
- Centralized notification feed with type filters (info, success, warning, error)
- Mark individual or all notifications as read
- Delete notifications
- Unread badge counter in the navbar

### Reports & Analytics
- Registration trends over time
- NGO distribution statistics
- User analytics breakdown
- Project statistics
- CSV export functionality
- Multiple chart types (line, bar, pie via Recharts)

### Profile Management
- Edit personal information
- Password change with strength indicator and validation
- Avatar upload and removal
- Account info and login history

### Settings
The settings panel is organized into six modules:

| Module | Description |
|---|---|
| Platform Settings | General site configuration |
| Roles & Permissions | Access control and role management |
| Security Settings | Two-factor auth, session management |
| Email Templates | Configure and preview email notifications |
| Audit Log | Admin activity tracking and history |
| API & Integrations | API key management and third-party integrations |

---

## Pages & Routes

| Route | Description |
|---|---|
| `/login` | Admin sign-in page |
| `/dashboard` | Main metrics and overview |
| `/ngo` | NGO/charity listing |
| `/ngo/[id]` | Individual NGO detail |
| `/users` | User listing and management |
| `/users/[id]` | Individual user detail |
| `/requests` | Registration & verification request review |
| `/notifications` | Notification center |
| `/reports` | Analytics and reporting |
| `/profile` | Admin profile settings |
| `/settings` | Platform configuration |

---

## Authentication & Security

Authentication is session-based using **HttpOnly cookies**:

- Login submits credentials to `POST /api/auth/login` which sets an `access_token` cookie
- The Next.js middleware (`proxy.ts`) intercepts all requests and redirects unauthenticated users to `/login`
- The `ProtectedRoute` component wraps all dashboard layouts as a client-side guard
- The Axios instance includes a **response interceptor** that:
  - Catches `401 Unauthorized` responses
  - Attempts a silent token refresh via `POST /api/auth/refresh`
  - Queues concurrent requests during refresh and replays them on success
  - Redirects to `/login` if refresh also fails
- Logout calls `POST /api/auth/logout` to invalidate the session cookie server-side

---

## API Integration

All HTTP communication is handled through a single configured Axios instance in `lib/axios.ts`.

**Base configuration:**
```
Base URL:    process.env.NEXT_PUBLIC_API_URL
Credentials: true (sends cookies cross-origin)
```

**Key API endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/admin/profile` | Fetch current admin profile |
| PUT | `/api/admin/profile` | Update profile information |
| PUT | `/api/admin/profile/password` | Change password |
| PUT | `/api/admin/profile/avatar` | Upload / remove avatar |
| GET | `/api/admin/dashboard/stats` | Dashboard KPIs and chart data |
| GET | `/api/admin/notifications` | Paginated notifications |
| GET | `/api/admin/notifications/unread-count` | Unread notification count |
| PUT | `/api/admin/notifications/:id/read` | Mark notification as read |
| PUT | `/api/admin/notifications/read-all` | Mark all notifications as read |
| DELETE | `/api/admin/notifications/:id` | Delete a notification |
| GET | `/api/users` | Paginated user list with filters |
| POST | `/api/users` | Create new user |
| GET | `/api/users/:id` | User detail |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/charities` | Paginated NGO/charity list |
| POST | `/api/charities` | Create new charity |
| GET | `/api/charities/:id` | Charity detail |
| PUT | `/api/charities/:id` | Update charity |
| GET | `/api/requests/registration` | Registration request list |
| GET | `/api/requests/verification` | Verification request list |
| POST | `/api/requests/:id/approve` | Approve a request |
| POST | `/api/requests/:id/decline` | Decline a request |
| POST | `/api/upload/single` | Upload file (images / documents) |

---

## Components

| Component | Description |
|---|---|
| `Navbar` | Top header with notification bell (unread badge), user avatar, and dropdown menu |
| `Sidebar` | Collapsible left navigation with route highlighting and logout |
| `ProtectedRoute` | Client-side auth guard — redirects to `/login` if no user session |
| `ConfirmModal` | Generic confirmation dialog for destructive actions |
| `CustomDropdown` | Accessible dropdown with optional search and multi-select |
| `CustomDatePicker` | Styled date input field with calendar support |
| `Fileuploader` | Drag-and-drop file upload with preview |
| `logo` | Hope Link SVG logo with gradient rendering |

---

## License

This project is private and proprietary. Unauthorized distribution or use is prohibited.
