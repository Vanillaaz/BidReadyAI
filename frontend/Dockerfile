FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In local dev we use npm run dev. For production, we build and start.
# This dockerfile is currently configured for dev usage via docker-compose overrides, 
# but falls back to dev server here for simplicity in rapid prototyping.
CMD ["npm", "run", "dev"]
