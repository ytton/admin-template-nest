FROM node
COPY ./dist/ /dist/
WORKDIR /dist/
RUN npm run start:product
EXPOSE 3000
CMD ["node main"]