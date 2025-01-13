// filepath: /c:/Users/Vanlerberghe/Desktop/FRONTDEV/PROJET GIT/OPOKEDEX Github/back/Dockerfile
# Use an official Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY back/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY back/ .

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]