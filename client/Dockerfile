# Use an official Node.js LTS image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the Vite build artifacts to the working directory
COPY dist ./dist

# Expose the port that your application will run on (adjust as needed)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
