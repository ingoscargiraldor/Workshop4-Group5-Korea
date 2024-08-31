# Data Privacy Vault

Este proyecto es un "Data Privacy Vault" que permite anonimizar información personal identificable (PII) como nombres, correos electrónicos y números de teléfono. Además, integra una API de OpenAI para procesar consultas de manera segura, enviando prompts anonimizados y desanonimizando las respuestas antes de devolverlas al usuario.

## Características

- **Anonimización de PII**: Reemplaza nombres, correos electrónicos y números de teléfono en un mensaje con tokens únicos.
- **Desanonimización de PII**: Restaura los valores originales de los tokens.
- **Integración con OpenAI**: Envía prompts anonimizados a OpenAI y desanonimiza las respuestas para devolverlas al cliente.

## Requisitos Previos

- Node.js v18.20.4 o superior
- MongoDB Atlas (u otra base de datos MongoDB accesible)
- Una cuenta de OpenAI con una clave API válida

```plaintext
data-privacy-vault/
│
├── node_modules/
│
├── .dockerignore
├── .env
├── Dockerfile
├── index_Dockerfile.js
├── index.js
├── mogosee.js
├── openaiService.js
├── package-lock.json
├── package.json
├── promps.txt
└── readme.dm
```

## Descripción de los Archivos

- **node_modules/**: Directorio que contiene los módulos y dependencias de Node.js.
- **.dockerignore**: Archivo que indica a Docker qué archivos o directorios deben ser ignorados al construir la imagen Docker.
- **.env**: Archivo que contiene las variables de entorno, tales como las credenciales para servicios externos.
- **Dockerfile**: Archivo utilizado para crear una imagen Docker para el proyecto.
- **index_Dockerfile.js**: Archivo JavaScript que es utilizado dentro del contenedor Docker.
- **index.js**: Archivo principal de la aplicación, fuera del contenedor.
- **mogosee.js**: Archivo JavaScript, posiblemente relacionado con MongoDB.
- **openaiService.js**: Archivo que probablemente contiene la lógica para interactuar con la API de OpenAI.
- **package-lock.json**: Archivo que contiene la información exacta de las versiones de las dependencias instaladas.
- **package.json**: Archivo que define las dependencias del proyecto y otra información relevante como scripts de npm.
- **promps.txt**: Archivo de texto, posiblemente para almacenar prompts o comandos utilizados en el proyecto.
- **readme.dm**: Archivo README del proyecto (parece tener una extensión no estándar, podría ser un error tipográfico).


## Instalación

1. **Clonar el repositorio**:

   Clona el repositorio del proyecto desde GitHub y navega al directorio del proyecto:

   ```bash
   git clone https://github.com/tu-usuario/data-privacy-vault.git
   cd data-privacy-vault
   ```

2. **Instalar las dependencias**:

   Una vez en el directorio del proyecto, instala las dependencias necesarias utilizando `npm`:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto y agrega tu clave API de OpenAI en el archivo:

   ```plaintext
   OPENAI_API_KEY=tu_api_key_de_openai
   ```

   Asegúrate de reemplazar `tu_api_key_de_openai` con tu clave API real.

4. **Configurar la conexión a MongoDB Atlas**:

   Abre el archivo `index.js` y actualiza la cadena de conexión a MongoDB Atlas con tus credenciales:

   ```javascript
   const uri = "mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/data-privacy-vault?retryWrites=true&w=majority";
   ```

   Reemplaza `<tu_usuario>`, `<tu_contraseña>`, y `<tu_cluster>` con los valores correspondientes de tu cuenta de MongoDB Atlas.

5. **Iniciar el servidor**:

   Inicia el servidor Node.js:

   ```bash
   node index.js
   ```

   Verás un mensaje indicando que el servidor está en ejecución:

   ```plaintext
   Conectado a MongoDB Atlas con Mongoose
   Servidor ejecutándose en http://localhost:3001
   ```

## Uso

### 1. Anonimizar un mensaje

Puedes enviar un mensaje que contenga PII para anonimizarlo utilizando el siguiente comando:

```bash
curl -X POST http://localhost:3001/anonymize \
-H "Content-Type: application/json" \
-d '{"message":"oferta de trabajo para Dago Borda con email dborda@gmail.com y teléfono 3152319157"}'
```

### 2. Desanonimizar un mensaje

Para desanonimizar un mensaje que ha sido previamente anonimizado, utiliza el siguiente comando:

```bash
curl -X POST http://localhost:3001/deanonymize \
-H "Content-Type: application/json" \
-d '{"anonymizedMessage":"oferta de trabajo para NAME_xxx con email EMAIL_xxx y teléfono PHONE_xxx"}'
```

Asegúrate de reemplazar `NAME_xxx`, `EMAIL_xxx`, y `PHONE_xxx` con los tokens reales obtenidos de la anonimización.

### 3. Interactuar con OpenAI

Envía un prompt a OpenAI utilizando el endpoint `/secureChatGPT` con el siguiente comando:

```bash
curl -X POST http://localhost:3001/secureChatGPT \
-H "Content-Type: application/json" \
-d '{"prompt":"Hola, soy Dago Borda. Mi email es dborda@gmail.com y mi teléfono es 3152319157."}'
```

La respuesta será desanonimizada y devuelta al cliente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un "Issue" o un "Pull Request" para discutir cualquier cambio importante antes de enviarlo.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.




## Ejemplos de salida

```bash
oscargiraldor@OscarGiraldo:~/workshop4/data-privacy-vault/data-privacy-vault$ curl -X POST http://localhost:3001/secureChatGPT \
-H "Content-Type: application/json" \
-d '{"prompt":"Mi nombre es Dago Borda. Ayer tuve un problema con mi computadora, y hoy quiero saber cómo puedo evitar que vuelva a suceder. Mi email es dborda@gmail.com."}'
{"response":"Hola, Dago Borda. Para evitar que vuelva a suceder un problema con tu computadora, te recomendaría seguir estos consejos:\n\n1. Mantén tu computadora actualizada: Asegúrate de instalar las actualizaciones de software y de sistema operativo de manera regular para evitar posibles vulnerabilidades.\n\n2. Utiliza un buen software antivirus: Instala un antivirus confiable y realiza escaneos periódicos para detectar y eliminar posibles amenazas.\n\n3. Realiza copias de seguridad de manera regular: Guarda tus archivos importantes en un disco duro externo o en la nube para evitar perder información en caso de un fallo del sistema."}oscargiraldor@OscarGirald
oscargiraldor@OscarGiraldo:~/workshop4/data-privacy-vault/data-privacy-vault$ 
```
```bash
Prompt anonimizado: Mi nombre es NAME_eff77e0ba0cd. Ayer tuve un problema con mi computadora, y hoy quiero saber cómo puedo evitar que vuelva a suceder. Mi email es EMAIL_a63a68553e54.
Respuesta completa de OpenAI: {
  id: 'chatcmpl-A2NsBpHzafNTqYYem9pIys09bhbMw',
  object: 'chat.completion',
  created: 1725131787,
  model: 'gpt-3.5-turbo-0125',
  choices: [
    {
      index: 0,
      message: [Object],
      logprobs: null,
      finish_reason: 'length'
    }
  ],
  usage: { prompt_tokens: 57, completion_tokens: 150, total_tokens: 207 },
  system_fingerprint: null
}
Respuesta anonimizada de OpenAI: Hola, NAME_eff77e0ba0cd. Para evitar que vuelva a suceder un problema con tu computadora, te recomendaría seguir estos consejos:

1. Mantén tu computadora actualizada: Asegúrate de instalar las actualizaciones de software y de sistema operativo de manera regular para evitar posibles vulnerabilidades.

2. Utiliza un buen software antivirus: Instala un antivirus confiable y realiza escaneos periódicos para detectar y eliminar posibles amenazas.

3. Realiza copias de seguridad de manera regular: Guarda tus archivos importantes en un disco duro externo o en la nube para evitar perder información en caso de un fallo del sistema.
Respuesta desanonimizada: Hola, Dago Borda. Para evitar que vuelva a suceder un problema con tu computadora, te recomendaría seguir estos consejos:

1. Mantén tu computadora actualizada: Asegúrate de instalar las actualizaciones de software y de sistema operativo de manera regular para evitar posibles vulnerabilidades.

2. Utiliza un buen software antivirus: Instala un antivirus confiable y realiza escaneos periódicos para detectar y eliminar posibles amenazas.

3. Realiza copias de seguridad de manera regular: Guarda tus archivos importantes en un disco duro externo o en la nube para evitar perder información en caso de un fallo del sistema.
```

## Datos de MongoDB

```bash
_id
66d11eab233e1c55079e2db1
info
"Dago Borda"
token
"564343bd"
__v
0
_id
66d11eac233e1c55079e2db4
info
"dborda@gmail.com"
token
"061ce120"
__v
0


_id
66d11eac233e1c55079e2db7
info
"3152319157"
token
"5ff0b17a"
__v
0
_id
66d3615bbd0dafba059ca17c
original
"Dago Borda"
token
"NAME_f9f1e78fb484"
__v
0
_id
66d3615cbd0dafba059ca17f
original
"dborda@gmail.com"
token
"EMAIL_f4d05cab7d20"
__v
0
_id
66d3615cbd0dafba059ca182
original
"3152319157"
token
"PHONE_fa1b5f18455f"
__v
0
```

## Adicional

## Dockerización del Proyecto

Para facilitar la implementación y el despliegue, puedes dockerizar este proyecto siguiendo estos pasos:

### Paso 1: Instalar Docker

Asegúrate de tener Docker instalado en tu sistema. Si no lo tienes, descárgalo e instálalo desde docker.com.

### Paso 2: Crear un Dockerfile

En la raíz de tu proyecto, crea un archivo llamado `Dockerfile` (sin extensión). Añade lo siguiente al Dockerfile:

```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY index_Dockerfile.js ./index.js
COPY openaiService.js ./
EXPOSE 3001
CMD ["node", "index.js"]
```

### Paso 3: Crear un archivo `.dockerignore`

Crea un archivo `.dockerignore` en la raíz del proyecto. Añade lo siguiente al archivo:

```plaintext
node_modules
npm-debug.log
index.js
.env
```

### Paso 4: Configurar `index_Dockerfile.js`

Asegúrate de que `index_Dockerfile.js` use variables de entorno para la conexión a MongoDB y la clave API de OpenAI:

```javascript
const uri = process.env.MONGODB_URI;
const openaiApiKey = process.env.OPENAI_API_KEY;
```

### Paso 5: Construir la imagen Docker

Ejecuta en la terminal:

```bash
docker build -t data-privacy-vault .
```

### Paso 6: Crear un archivo `.env`

Crea un archivo `.env` en la raíz de tu proyecto con las variables de entorno necesarias:

```plaintext
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@tu_cluster.mongodb.net/data-privacy-vault?retryWrites=true&w=majority
OPENAI_API_KEY=tu_clave_api_de_openai
```

Reemplaza los valores con tus credenciales reales.

### Paso 7: Ejecutar el contenedor

Para ejecutar el contenedor de forma segura, utiliza el siguiente comando:

```bash
docker run -p 3001:3001 --env-file .env data-privacy-vault
```

Este comando usa el archivo `.env` para pasar las variables de entorno al contenedor de forma segura.

### Paso 8: Verificar la aplicación

Visita http://localhost:3001 en tu navegador para ver la aplicación en funcionamiento.

## Notas importantes

- El Dockerfile ahora no copia el archivo `.env` al contenedor, mejorando la seguridad.
- Asegúrate de que `index_Dockerfile.js` esté configurado correctamente para usar las variables de entorno.
- Nunca comitas el archivo `.env` en tu sistema de control de versiones. Añádelo a tu `.gitignore`.
- Configura MongoDB Atlas para permitir conexiones desde la IP del contenedor Docker.
- En un entorno de producción, considera usar servicios de gestión de secretos en lugar de archivos `.env`.

## Próximos pasos

- Aprende sobre Docker Compose para manejar múltiples contenedores.
- Investiga las mejores prácticas de seguridad para contenedores Docker en producción.
- Considera usar un servicio de registro de contenedores para despliegues en la nube.

```bash
oscargiraldor@OscarGiraldo:~/workshop4/data-privacy-vault/data-privacy-vault$ sudo docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS                                       NAMES
242001c28303   data-privacy-vault   "docker-entrypoint.s…"   8 minutes ago   Up 8 minutes   0.0.0.0:3001->3001/tcp, :::3001->3001/tc
```

## Petición
```bash
oscargiraldor@OscarGiraldo:~/workshop4/data-privacy-vault/data-privacy-vault$ curl -X POST http://localhost:3001/secureChatGPT -H "Content-Type: application/json" -d '{"prompt":"Mi nombre es Dago Borda. Ayer tuve un problema con mi mascota, y hoy quiero saber cómo puedo evitar que vuelva a suceder. Mi email es dborda@gmail.c
om."}'

{"response":"Lamento escuchar que tuviste un problema con tu mascota. Para evitar que vuelva a suceder, te recomendaría analizar las posibles causas del incidente y tomar medidas preventivas. Algunas sugerencias para evitar futuros problemas con tu mascota podrían ser:\n\n- Asegurarte de que tu mascota tenga suficiente ejercicio y estimulación mental para evitar comportamientos no deseados.\n- Proporcionarle un ambiente seguro y adecuado para su tamaño y necesidades.\n- Implementar un entrenamiento adecuado para corregir comportamientos no deseados.\n- Consultar con un veterinario o un entrenador profesional si tienes dudas sobre el comport"}oscargiraldor@OscarGiraldo:~/workshop4/data-privacy-vault/data-privacy-vault$ 
```
## Log del contenedor
```bash
Prompt anonimizado: Mi nombre es NAME_eff77e0ba0cd. Ayer tuve un problema con mi mascota, y hoy quiero saber cómo puedo evitar que vuelva a suceder. Mi email es EMAIL_a63a68553e54.
Respuesta completa de OpenAI: {
  id: 'chatcmpl-A2Oijuo8AJnf7D3YflFz4HwcNGRc9',
  object: 'chat.completion',
  created: 1725135045,
  model: 'gpt-3.5-turbo-0125',
  choices: [
    {
      index: 0,
      message: [Object],
      logprobs: null,
      finish_reason: 'length'
    }
  ],
  usage: { prompt_tokens: 57, completion_tokens: 150, total_tokens: 207 },
  system_fingerprint: null
}
Respuesta anonimizada de OpenAI: Lamento escuchar que tuviste un problema con tu mascota. Para evitar que vuelva a suceder, te recomendaría analizar las posibles causas del incidente y tomar medidas preventivas. Algunas sugerencias para evitar futuros problemas con tu mascota podrían ser:

- Asegurarte de que tu mascota tenga suficiente ejercicio y estimulación mental para evitar comportamientos no deseados.
- Proporcionarle un ambiente seguro y adecuado para su tamaño y necesidades.
- Implementar un entrenamiento adecuado para corregir comportamientos no deseados.
- Consultar con un veterinario o un entrenador profesional si tienes dudas sobre el comport
Respuesta desanonimizada: Lamento escuchar que tuviste un problema con tu mascota. Para evitar que vuelva a suceder, te recomendaría analizar las posibles causas del incidente y tomar medidas preventivas. Algunas sugerencias para evitar futuros problemas con tu mascota podrían ser:

- Asegurarte de que tu mascota tenga suficiente ejercicio y estimulación mental para evitar comportamientos no deseados.
- Proporcionarle un ambiente seguro y adecuado para su tamaño y necesidades.
- Implementar un entrenamiento adecuado para corregir comportamientos no deseados.
- Consultar con un veterinario o un entrenador profesional si tienes dudas sobre el comport
```
