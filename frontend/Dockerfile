# frontend/Dockerfile

# Stage 1: Build the Angular application
FROM node:18 as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# CMD ["tail", "-f", "/dev/null"]
# Stage 2: Serve the Angular application using NGINX
FROM nginx:latest
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
