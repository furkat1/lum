# Stage 1: Build the Next.js application
FROM node:21-alpine
ARG NEXT_SESSION_SECRET
ENV NEXT_SESSION_SECRET=$NEXT_SESSION_SECRET
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN cd @shared && yarn install && cd -

# # Build the Next.js application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["yarn", "start"]