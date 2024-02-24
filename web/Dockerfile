FROM node@sha256:2e627b2c2cb49df1f9898a357b48058ff33ba064aaba05e652a6edcae746dfab

WORKDIR /app
COPY ./web .

RUN npm i

ENTRYPOINT [ "sh", "-c", "npm run generate && npm run dev" ]