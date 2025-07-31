const axios = require('axios');

module.exports = function (app) {
    // Fetch Hentai NSFW image buffer via proxy
    async function fetchHentaiImage() {
        try {
            const { data } = await axios.get(
                'https://jerryproxy.vercel.app/api/proxy?url=https://api.nekorinn.my.id/nsfwhub/hentai',
                { responseType: 'arraybuffer' }
            );
            return Buffer.from(data);
        } catch (error) {
            throw new Error("Failed to fetch hentai image: " + error.message);
        }
    }

    // Route: /nsfw/hentai
    app.get('/nsfw/hentai', async (req, res) => {
        try {
            const imageBuffer = await fetchHentaiImage();
            res.writeHead(200, {
                'Content-Type': 'image/jpeg', // Assuming most hentai images are JPEG
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};
