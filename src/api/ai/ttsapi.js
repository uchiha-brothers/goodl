const axios = require('axios');

module.exports = function(app) {
    async function fetchTTS(text, lang = 'en') {
        const url = `https://jerrycoder.oggyapi.workers.dev/textvideo?text=${encodeURIComponent(text)}&lang=${lang}`;
        const { data, headers } = await axios.get(url, {
            responseType: 'stream'
        });
        return { stream: data, headers };
    }

    app.get('/ai/tts', async (req, res) => {
        try {
            const { text, lang } = req.query;

            if (!text) {
                return res.status(400).json({
                    status: false,
                    error: 'Missing required ?text= parameter'
                });
            }

            const { stream, headers } = await fetchTTS(text, lang || 'en');

            res.setHeader('Content-Type', headers['content-type'] || 'audio/mpeg');
            stream.pipe(res);

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });
};
