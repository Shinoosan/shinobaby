FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["npm", "run", "serve"] 