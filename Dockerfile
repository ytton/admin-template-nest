FROM node
COPY ./dist/ /dist/
WORKDIR /dist/
EXPOSE 3000
CMD ["node main"]