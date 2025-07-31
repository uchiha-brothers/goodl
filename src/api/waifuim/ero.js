const axios = require('axios');

module.exports = function (app) {
    // Fetch NSFW hentai image via proxy
    async function fetchHentaiImage() {
        try {
            const response = await axios.get(
                'https://jerryproxy.vercel.app/api/proxy?url=https://api.nekorinn.my.id/waifuim/ero',
                { responseType: 'arraybuffer' }
            );

            const contentType = response.headers['content-type'] || 'image/jpeg';
            const buffer = Buffer.from(response.data);

            return { buffer, contentType };
        } catch (error) {
            throw new Error("Failed to fetch hentai image: " + error.message);
        }
    }

    // Route: /nsfw/hentai
    app.get('/waifuim/ero', async (req, res) => {
        try {
            const { buffer, contentType } = await fetchHentaiImage();

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': buffer.length
            });

            res.end(buffer);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};
