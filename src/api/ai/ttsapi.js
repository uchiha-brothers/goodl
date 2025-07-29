const axios = require('axios');

module.exports = function(app) {
    // TTS fetcher using your custom textvideo endpoint
    async function fetchTTS(text, lang = 'en') {
        const url = `https://jerrycoder.oggyapi.workers.dev/textvideo?text=${encodeURIComponent(text)}&lang=${lang}`;
        const { data } = await axios.get(url, {
            responseType: 'arraybuffer' // To handle audio stream (if needed)
        });
        return data;
    }

    // Route: /ai/tts
    app.get('/ai/tts', async (req, res) => {
        try {
            const { text, lang } = req.query;

            if (!text) {
                return res.status(400).json({
                    status: false,
                    error: 'Missing required ?text= parameter'
                });
            }

            const audioBuffer = await fetchTTS(text, lang || 'en');

            // Send audio file directly
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename="tts.mp3"'
            });
            res.send(audioBuffer);

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
