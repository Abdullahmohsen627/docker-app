FROM node:18 
WORKDIR app
COPY package.json .
ARG node_env
RUN if ["$node_env"="production"];\ 
    then npm install --only=production;\
    else npm install;\
    fi
COPY . .
EXPOSE 4000
CMD ["npm","run","start-dev"]
