FROM node:16.20-slim
COPY . /app
WORKDIR /app
RUN npm install
ENV TZ Asia/Tokyo
CMD npm run start
