FROM node:23.0.0-slim 

RUN apt update && apt install -y openssl procps

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]