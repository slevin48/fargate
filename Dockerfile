FROM node:latest

EXPOSE 8080

WORKDIR /app

COPY index.js /app

CMD ["node", "index.js"]