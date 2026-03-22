FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY sender.js .
EXPOSE 8080
CMD ["node", "sender.js"]