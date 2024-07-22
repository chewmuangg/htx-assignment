# use Node.js official image
FROM node

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 5555

# start the application
CMD [ "npm", "start" ]