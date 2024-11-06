# TodoBackend(Version 0.0.1)

## Overview

This todo app is designed to handle all authentication-related operations within our application ecosystem and basic todo operations. It provides secure, scalable authentication capabilities, including user registration, login, using token-based authentication, CRUD todo operations.

## Features

- **User Registration:** Allows new users to register to the application by providing necessary personal information.
- **User Login:** Handles user authentication and provides session tokens for accessing protected resources.
- **Forgot Password:** User can trigger forgot password and receive security code in their email, after verifying the security code, they are sent jwt token to perform authorized password reset.
- **Create Todo:** User can create todo.
- **Get Todo:** User can see all the todo they have created and also get todo by id.
- **Update Todo:** User can update their todo.
- **Delete Todo:** User can delete the todo.

## Technologies

- **Language/Framework:** [ Typescript, Node.js with Express]
- **Database:** [ MongoDB ]
- **Authentication:** [ JWT, Bcrypt ]

## Getting Started

### Prerequisites

- Install node v18.19.0

### Installation / Running

1. Clone the repository:

   ```bash
   git clone https://github.com/ShashwotBhattarai/auth_microservice.git
   ```

2. Install NPM packages:

   ```bash
   npm install
   ```

3. Add env variables:

   ```bash
    JWT_SECRET=,
    PORT=,
    MONGODB_URI=,
   ```

4. Run the application:

   ```bash
   npm run start
   ```
