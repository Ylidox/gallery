FROM node:18-alpine
WORKDIR /gallery_front
COPY package.json .

COPY . .
EXPOSE 3000
RUN npm install -g npm@10.4.0
CMD ["npm", "start"]