

module.exports = function(app) {
    // TTS handler function
    async function fetchTTS(text, lang = 'en') {
        const url = `https://jerrycoder.oggyapi.workers.dev/tts?text=${encodeURIComponent(text)}&lang=${lang}`;
        const { data } = await axios.get(url);
        return data;
    }

    // Route handler
    app.get('/ai/tts', async (req, res) => {
        try {
            const { text, lang } = req.query;

            if (!text) {
                return res.status(400).json({
                    status: false,
                    error: 'Query ?text= is required'
                });
            }

            const result = await fetchTTS(text, lang || 'en');

            if (result.status !== 'success') {
                return res.status(500).json({
                    status: false,
                    error: 'TTS API failed or returned an error'
                });
            }
