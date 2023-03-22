# Use node 14 as the base image
FROM node:14-alpine

# Set the working directory to the root of the React project
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install dependencies inside the Docker container
RUN npm install

# Copy the rest of the React project files to the Docker image
COPY . .

# Build the production version of the React application
RUN npm run build

# Start the React application
CMD ["npm", "start"]
