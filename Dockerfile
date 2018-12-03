
FROM node:11.2.0

# Create app directory
WORKDIR /var/app/current

# Install app dependencies
COPY package*.json ./
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:production" ]
