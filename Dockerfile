FROM node
COPY . .
RUN npm install
EXPOSE 3001
