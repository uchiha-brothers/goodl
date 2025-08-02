const axios = require('axios');

module.exports = function(app) {

    app.get('/ai/upscale', async (req, res) => {
        try {
            const { image } = req.query;
            if (!image) {
                return res.status(400).json({ status: false, error: 'Image URL is required' });
            }

            const upscaleUrl = `https://jerrycoder.oggyapi.workers.dev/vupscale?image=${encodeURIComponent(image)}`;

            const response = await axios.get(upscaleUrl, { responseType: 'arraybuffer' });

            // Set headers to return the image directly
            res.set('Content-Type', response.headers['content-type']);
            res.send(response.data);

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });

};
