FROM node:16
WORKDIR /app
COPY . /app
COPY package.json .
COPY vite.config.js .
RUN npm cache clean --force
RUN npm install --force
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]