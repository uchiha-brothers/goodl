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

      const contentType = response.headers['content-type'] || '';
      let extension = 'jpg'; // default

      if (contentType.includes('png')) extension = 'png';
      else if (contentType.includes('webp')) extension = 'webp';
      else if (contentType.includes('jpeg') || contentType.includes('jpg')) extension = 'jpg';
      else if (contentType.includes('gif')) extension = 'gif';

      res.set('Content-Type', contentType);
      res.set('Content-Disposition', `inline; filename="JerryCoder-upscaleimage.${extension}"`);
      res.send(response.data);

    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
