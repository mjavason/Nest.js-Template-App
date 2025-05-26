# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
