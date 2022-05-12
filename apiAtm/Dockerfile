#STEP 1 BUILD REACT APP 
FROM node:14.19-alpine
WORKDIR /apinode
COPY package.json ./
RUN npm cache clean --force
RUN npm install
RUN npm install sequelize-cli
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
