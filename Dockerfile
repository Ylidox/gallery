FROM node
COPY . .
RUN npm install
EXPOSE 3001
CMD ["cd", "back"]
CMD ["node", "index.js"]
