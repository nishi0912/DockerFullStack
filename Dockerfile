
FROM node:alpine

# Create an application directory
RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

#  This line run command to install your dependencies on image build.
RUN npm install --force
RUN npm install -D @swc/cli @swc/core
RUN npm install next

# This line copies the src files(first '.'(from), Your project file) 
# into the destination directory (second '.'(to), if your specify any destination or else root directory('/app' - WORKDIR)).
# Images have their own folder structure.
# COPY . /app - Copies all your src files to app directory inside the image, so that the destination does not clash with other root directories.
COPY . .

# This run your server
CMD ["npm", "run", "dev"]

# This is the port number you want to run
EXPOSE 3005
