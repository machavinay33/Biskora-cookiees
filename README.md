# Biskora Cookies Website

This is a rebuilt version of the Biskora Cookies website, featuring a PostgreSQL database, an admin login system, and deployment readiness for platforms like Vercel, Render, or Railway.

## Features

- **Frontend**: React with Vite, TypeScript, and TailwindCSS
- **Backend**: Express.js with tRPC
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based Admin Login
- **Admin Dashboard**: Manage contact inquiries, products, and stock status
- **Responsive Design**: Optimized for various screen sizes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd biskora-cookies-web
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory based on `.env.example`:

    ```
    DATABASE_URL="postgresql://user:password@host:port/database_name"
    JWT_SECRET="your_jwt_secret_key_here"
    ```

    -   `DATABASE_URL`: Connection string for your PostgreSQL database.
    -   `JWT_SECRET`: A strong, random string for JWT token signing.

4.  **Run database migrations and seed initial data:**

    ```bash
    pnpm run db:push
    pnpm run db:seed
    ```

    This will create the necessary tables and seed a default admin user (`admin@biskora.com` with password `biskora2024`). **Change this password immediately after first login.**

### Running the application

-   **Development mode:**

    ```bash
    pnpm run dev
    ```

    The application will be available at `http://localhost:3000` (or another port if configured).

-   **Production mode:**

    ```bash
    pnpm run build
    pnpm run start
    ```

## Deployment

This project is configured for easy deployment to platforms like Vercel, Render, or Railway.

### Render

A `render.yaml` file is provided for Render deployment. You will need to set the `DATABASE_URL` and `JWT_SECRET` environment variables in your Render dashboard.

### Other Platforms

-   **Dockerfile**: A `Dockerfile` is included for containerized deployments.
-   **Build Command**: `pnpm install && pnpm build`
-   **Start Command**: `pnpm start`

Ensure you configure your environment variables (`DATABASE_URL`, `JWT_SECRET`) on your chosen platform.

## Admin Access

-   **Admin Login URL**: `/admin/login`
-   **Default Admin Credentials**:
    -   Email: `admin@biskora.com`
    -   Password: `biskora2024`

**IMPORTANT**: Change the default admin password immediately after your first login.
