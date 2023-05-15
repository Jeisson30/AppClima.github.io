# Establecemos la imagen base
FROM node:14-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos necesarios
COPY package*.json ./
COPY src ./src

# Instalamos las dependencias
RUN npm install --production

# Exponemos el puerto 3000 (el puerto que utiliza nuestra aplicación)
EXPOSE 3000

# Comando que se ejecuta al iniciar el contenedor
CMD ["npm", "start"]
