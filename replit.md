# API Directory Application

## Overview

This is a full-stack web application that provides a searchable directory of API endpoints. Built with React frontend and Express backend, the application allows users to browse and search through a collection of API applications with their corresponding endpoints. The system loads API data from a JSON file and provides both browsing and search functionality with a clean, modern interface using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling and tree-shaking
- **Data Storage**: In-memory storage with JSON file as data source
- **API Design**: RESTful endpoints with proper error handling

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current Implementation**: Memory storage loading from JSON file (appxapis_1756726028742.json)
- **Schema**: Defined API apps table with id, name, and api URL fields
- **Future Ready**: Database configuration prepared for PostgreSQL deployment

### Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Component Architecture**: Reusable UI components following atomic design principles
- **Custom Hooks**: Encapsulated logic in React hooks (useApiSearch, useToast)
- **Error Boundaries**: Comprehensive error handling with user-friendly messages

### Development Workflow
- **Hot Reload**: Vite HMR for instant feedback during development
- **Type Checking**: TypeScript compiler for static analysis
- **Code Quality**: Consistent code formatting and structure
- **Development Server**: Concurrent frontend and backend development

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Utilities**: clsx for conditional classes, date-fns for date handling
- **Development**: Vite plugins for development enhancement

### Backend Dependencies
- **Server Framework**: Express.js for HTTP server and routing
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for runtime type validation and schema parsing
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Build and Development Tools
- **Package Manager**: npm with lockfile for consistent dependencies
- **TypeScript**: Full TypeScript support across the stack
- **Vite**: Modern build tool with plugins for React and development enhancements
- **PostCSS**: CSS processing with Tailwind and autoprefixer
- **Replit Integration**: Specialized plugins for Replit development environment

### Database and Storage
- **Primary Database**: PostgreSQL (configured via DATABASE_URL)
- **ORM**: Drizzle ORM with TypeScript integration
- **Migrations**: Drizzle Kit for schema management
- **Current Data Source**: JSON file with API directory data
- **Session Store**: PostgreSQL-backed session management ready for implementation