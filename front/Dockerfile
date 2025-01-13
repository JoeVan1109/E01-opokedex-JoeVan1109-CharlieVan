# Use an official nginx image as the base image
FROM nginx:alpine

# Copy the static files to the nginx html directory
COPY front /usr/share/nginx/html

# Expose the port that nginx will run on
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]