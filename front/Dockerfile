FROM node:18-alpine
WORKDIR /gallery_front
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]