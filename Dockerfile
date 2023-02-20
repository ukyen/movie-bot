FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install

# COPY application code
COPY src /app/src
COPY views /app/views
COPY .env .

EXPOSE $PORT

CMD ["node", "/app/src/index.js"]
