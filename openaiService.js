const fetch = require('node-fetch');

class OpenAIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async generateCompletion(prompt) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', { // Cambiar a /v1/chat/completions
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // Cambiar el modelo a uno compatible
                    messages: [{ role: 'user', content: prompt }], // Ajustar el formato de mensaje para chat completions
                    max_tokens: 150,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            console.log('Respuesta completa de OpenAI:', data);

            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim(); // Ajuste para chat completions
            } else {
                throw new Error('Unexpected response format from OpenAI API');
            }
        } catch (error) {
            console.error('Error generando completion:', error.message || error);
            throw error;
        }
    }
}

module.exports = OpenAIService;
