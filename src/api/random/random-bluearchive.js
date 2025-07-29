const axios = require('axios');

module.exports = function (app) {
    // Fetch waifu image buffer
    async function fetchWaifuImage() {
        try {
            const { data } = await axios.get('https://jerrycoder.oggyapi.workers.dev/waifuv2?json=true');

            if (!data || !data.url) {
                throw new Error("Invalid response from waifu API");
            }

            const imageResponse = await axios.get(data.url, { responseType: 'arraybuffer' });
            return Buffer.from(imageResponse.data);
        } catch (error) {
            throw error;
        }
    }

    // Route: /random/waifu
    app.get('/random/ba', async (req, res) => {
        try {
            const imageBuffer = await fetchWaifuImage();
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
