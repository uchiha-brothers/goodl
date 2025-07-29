const axios = require('axios');

module.exports = function(app) {
    // TTS fetcher
    async function fetchTTS(text, lang = 'en') {
        const url = `https://jerrycoder.oggyapi.workers.dev/tts?text=${encodeURIComponent(text)}&lang=${lang}`;
        const { data } = await axios.get(url);
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

            const result = await fetchTTS(text, lang || 'en');

            if (!result || result.status !== 'success') {
                return res.status(502).json({
                    status: false,
                    error: 'TTS API returned an error or failed'
                });
            }

            res.status(200).json({
                status: true,
                translated: result
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
