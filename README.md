# Service Delivery App

A full-stack service delivery platform that connects customers with service providers.

This project is a complete rebuild of the original Service Delivery App, using a modern, simpler, and more maintainable technology stack.

## Overview

The Service Delivery App is designed to allow customers to find and request services from providers, while giving providers tools to manage service requests and complete jobs.

The platform will support three primary roles:

- **Customers** — browse services and submit service requests.
- **Service Providers** — receive, manage, and complete service requests.
- **Administrators** — manage users, services, requests, and the overall platform.

The application is being developed as a single full-stack Next.js application rather than as separate frontend and backend projects.

## Features

### Customer

- Account registration and authentication
- Customer profile
- Browse available services
- Submit service requests
- Provide request details and location
- View request status
- Track active and completed requests
- Review completed services

### Service Provider

- Provider registration and authentication
- Provider profile
- Manage offered services
- View available service requests
- Accept or reject requests
- Manage active jobs
- Update request status
- View completed jobs
- View earnings/history

### Administrator

- Administrative dashboard
- Manage users
- Manage service providers
- Manage services
- Manage service requests
- Monitor platform activity
- Manage reviews and other platform data

## Technology Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | Full-stack web framework |
| React | User interface |
| TypeScript | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
| [Supabase](https://supabase.com/) | Database, authentication and storage |
| PostgreSQL | Relational database |
| Zod | Data validation |
| React Hook Form | Form management |
| date-fns | Date and time utilities |
| [Vercel](https://vercel.com/) | Deployment |
| Git / GitHub | Version control |

## Architecture

The application uses a full-stack Next.js architecture.

```text
                    ┌─────────────────────┐
                    │       Client        │
                    │   React / Next.js   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │ Server Components   │
                    │ Server Actions      │
                    │ Route Handlers      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Supabase       │
                    │                     │
                    │ PostgreSQL          │
                    │ Authentication      │
                    │ Storage             │
                    └─────────────────────┘
