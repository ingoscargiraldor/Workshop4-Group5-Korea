# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos necesarios
COPY index_Dockerfile.js ./index.js
COPY openaiService.js ./
COPY .env ./

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3001

# Define la variable de entorno para la clave API de OpenAI
ENV OPENAI_API_KEY=tu_api_key_aqui

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]