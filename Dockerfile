FROM node
COPY . .
RUN npm install
RUN cd back
EXPOSE 3001
CMD ["node", "index.js"]