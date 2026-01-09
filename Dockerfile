FROM node:18-alpine

# Create working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy source files
COPY . .

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Build the app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
