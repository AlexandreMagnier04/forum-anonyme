FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY thread.js .
EXPOSE 80
CMD ["node", "thread.js"]