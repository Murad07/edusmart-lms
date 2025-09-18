# EduSmart LMS

EduSmart LMS is a comprehensive Learning Management System designed to facilitate online education. It provides features for user authentication, course management, and more, catering to students, instructors, and administrators.

## Features

### Phase 1: Project Setup & Planning
- Defined detailed user personas.
- Designed a high-level system architecture.
- Initialized Git repository and project structure.
- Set up Node.js backend with Express, Mongoose, Dotenv, Cors.
- Set up Next.js frontend with TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, Tanstack Query.
- Configured MongoDB Atlas.
- Set up ESLint, Prettier, and Husky for code quality.

### Phase 2: Authentication & User Management
- Implemented backend authentication with JWT and BcryptJS.
- Designed and implemented User model with roles.
- Created user registration and login endpoints.
- Implemented JWT verification and role-based authorization middleware.
- Set up backend testing with Jest.
- Created reusable UI components for forms and inputs.
- Built Login and Registration pages with forms.
- Implemented frontend form validation using React Hook Form and Zod.
- Created an API service layer for authentication requests.
- Set up a global state/context for managing authentication (user, token, isAuthenticated).
- Implemented protected routes that redirect unauthenticated users.
- Implemented role-based rendering/navigation.

## Technologies Used

### Frontend (Next.js, TypeScript)
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Form Management:** React Hook Form
- **Validation:** Zod, @hookform/resolvers
- **State Management/Data Fetching:** @tanstack/react-query
- **Language:** TypeScript

### Backend (Node.js, Express, TypeScript)
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Token (jsonwebtoken), BcryptJS
- **Environment Variables:** Dotenv
- **CORS:** Cors
- **API Documentation:** Swagger-jsdoc, Swagger-ui-express
- **Testing:** Jest, Supertest, MongoDB Memory Server
- **Development Utilities:** Ts-node-dev, Nodemon
- **Code Quality:** ESLint, Prettier, Husky
- **Language:** TypeScript

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (LTS version recommended)
- pnpm (comes with Node.js)
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/edumart-lms.git
    cd edumart-lms
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    pnpm install
    ```
    Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:
    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    pnpm install
    ```
    Create a `.env.local` file in the `frontend` directory and add your backend API URL:
    ```
    NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api/auth
    ```

### Running the Application

1.  **Start the Backend Server:**
    Open your terminal, navigate to the `backend` directory, and run:
    ```bash
    cd backend
    pnpm run dev
    ```
    The backend server will start on `http://localhost:5000` (or your specified PORT).

2.  **Start the Frontend Development Server:**
    Open a **new** terminal, navigate to the `frontend` directory, and run:
    ```bash
    cd frontend
    pnpm run dev
    ```
    The frontend application will be accessible at `http://localhost:3000`.

## Project Structure

```
.gitignore
DEVELOPMENT_PLAN.md
README.md
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.ts
├── package.json
└── ...
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   └── ...
├── package.json
└── ...
shared/
docs/
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the ISC License. See `LICENSE` for more information.

## Contact

Your Name - your_email@example.com
Project Link: [https://github.com/your-username/edumart-lms](https://github.com/your-username/edumart-lms)
