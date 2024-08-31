require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const OpenAIService = require('./openaiService'); // Asegúrate de que openaiService.js esté en el mismo directorio y use require

const app = express();
const port = 3001;

// Configura tu clave de API de OpenAI en un archivo .env
const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);

app.use(express.json());

const uri = "mongodb+srv://tu_usuario:tu_password@workshop.naubp.mongodb.net/data-privacy-vault?retryWrites=true&w=majority";

// Esquema y modelo de Mongoose
const tokenSchema = new mongoose.Schema({
    original: String,
    token: String,
});

const TokenModel = mongoose.model('Token', tokenSchema);

// Conectar a MongoDB Atlas usando Mongoose
mongoose.connect(uri)
    .then(() => {
        console.log('Conectado a MongoDB Atlas con Mongoose');
        app.listen(port, () => {
            console.log(`Servidor ejecutándose en http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1); // Detén la ejecución si no se puede conectar
    });

// Anonimizar un mensaje antes de enviarlo a OpenAI
async function anonymizeMessage(message) {
    const nameRegex = /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /\b\d{10}\b/g;

    message = await replaceAndStore(message, nameRegex, 'NAME');
    message = await replaceAndStore(message, emailRegex, 'EMAIL');
    message = await replaceAndStore(message, phoneRegex, 'PHONE');

    return message;
}

async function replaceAndStore(message, regex, prefix) {
    const matches = message.match(regex) || [];
    for (let match of matches) {
        let token = await TokenModel.findOne({ original: match });
        if (!token) {
            token = new TokenModel({ original: match, token: await generateToken(prefix) });
            await token.save();
        }
        message = message.replace(match, token.token);
    }
    return message;
}

async function deanonymizeMessage(anonymizedMessage) {
    const tokens = await TokenModel.find();
    for (let { original, token } of tokens) {
        // Usa una función sincrónica para asegurarte de que se reemplacen todos los tokens
        anonymizedMessage = anonymizedMessage.replace(new RegExp(token, 'g'), original);
    }
    return anonymizedMessage;
}


// Ruta para anonimizar un mensaje
app.post('/anonymize', async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ error: 'El campo "message" es requerido.' });
    }

    try {
        const anonymizedMessage = await anonymizeMessage(message);
        res.json({ anonymizedMessage });
    } catch (err) {
        console.error("Error en anonymize:", err);
        res.status(500).json({ error: 'Error al anonimizar el mensaje.' });
    }
});

// Ruta para desanonimizar un mensaje
app.post('/deanonymize', async (req, res) => {
    const anonymizedMessage = req.body.anonymizedMessage;

    if (!anonymizedMessage) {
        return res.status(400).json({ error: 'El campo "anonymizedMessage" es requerido.' });
    }

    try {
        const originalMessage = await deanonymizeMessage(anonymizedMessage);
        res.json({ message: originalMessage });
    } catch (err) {
        console.error("Error en deanonymize:", err);
        res.status(500).json({ error: 'Error al desanonimizar el mensaje.' });
    }
});

// Nuevo endpoint secureChatGPT
app.post('/secureChatGPT', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Anonimizar el prompt
        const anonymizedPrompt = await anonymizeMessage(prompt);
        console.log('Prompt anonimizado:', anonymizedPrompt);

        // Enviar el prompt anonimizado a ChatGPT
        const anonymizedResponse = await openaiService.generateCompletion(anonymizedPrompt);
        console.log('Respuesta anonimizada de OpenAI:', anonymizedResponse);

        // Desanonimizar la respuesta
        const deanonymizedResponse = await deanonymizeMessage(anonymizedResponse);
        console.log('Respuesta desanonimizada:', deanonymizedResponse);

        res.json({ response: deanonymizedResponse });
    } catch (error) {
        console.error('Error in secureChatGPT:', error);
        res.status(500).json({ error: `Failed to connect to OpenAI: ${error.message}` });
    }
});