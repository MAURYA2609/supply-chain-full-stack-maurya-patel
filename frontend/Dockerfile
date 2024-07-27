# Use the official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the required Node packages
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image to serve the React app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port that Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
