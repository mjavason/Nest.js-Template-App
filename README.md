# Nest.js-Template-App

Quick generic template for spinning up Nest.js apps. Supports cookie authentication, Swagger documentation, validation, logging, Mongoose ORM, environment variables, file handling, emails, caching, and more. Built for flexibility and scalability, this template is designed to help you bootstrap your next Nest.js project efficiently.

## Features

- **Cookie-based Authentication**: Secure, stateful authentication using cookies.
- **Swagger Documentation**: Automatically generated API documentation with Swagger.
- **Validation**: Input validation using `class-validator` and `class-transformer`.
- **Logging**: Structured logging with custom log levels.
- **Mongoose ORM**: Integration with MongoDB using Mongoose for database interactions.
- **Environment Variables**: Easy configuration using `.env` files.
- **File Handling**: Support for file uploads and management.
- **Email Support**: Integrated email service for notifications or transactional emails.
- **Caching**: Easily configurable caching mechanisms.

## Prerequisites

Before running this app, make sure you have the following installed:

- Node.js
- npm

## Installation

To get started, clone the repository and install the dependencies:

```bash
$ git clone https://github.com/mjavason/nest.js-template-app.git
$ cd nest.js-template-app
$ npm install
```

## Running the app

You can run the application in different modes depending on your environment:

```bash
# Development mode (auto-reloads on changes)
$ npm run start:dev

# Production mode
$ npm run start:prod

# Debugging mode
$ npm run start:debug
```

Ensure that your `.env` file is set up correctly before running the app.

## Environment Variables

The app uses environment variables to configure various settings. Check the .env.sample file for some key variables you might need to set up.

## Test

To run tests for the application:

```bash
# Unit tests
$ npm run test

# End-to-End (e2e) tests
$ npm run test:e2e

# Test coverage report
$ npm run test:cov
```

Testing is an important part of the development process, and this template supports unit and e2e testing using Jest.

## Project Structure

Here's an overview of the project structure:

```
|── src/
│   ├── app.module.ts          # Main application module
│   ├── app.controller.ts      # Main app controller
│   ├── log.controller.ts      # Logging controller
│   ├── auth/                  # Authentication module
│   ├── bucket/                # File storage and bucket management
│   ├── common/                # Shared utilities, guards, configs and interceptors
│   ├── mail/                  # Email service integration
│   ├── user/                  # User-related logic
│   ├── ...                    # Additional modules and services
│
├── test/                      # Test files for the application
├── .env.example               # Example environment configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation

```

## Contributing

Contributions are welcome! If you'd like to improve this template, feel free to open a pull request or submit issues.