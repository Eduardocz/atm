#STEP 1 BUILD REACT APP 
FROM node:14.19-alpine
WORKDIR /servicenode
COPY package.json ./
RUN npm install
RUN npm install sequelize-cli
RUN npm run migrations:run
COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]
