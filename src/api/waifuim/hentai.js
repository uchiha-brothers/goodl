/**
 * WaifuIm NSFW API - Hentai Image Fetcher
 * • Creator: JerryCoder
 * • Telegram: https://t.me/oggy_workshop
 * • Copyright © 2025 by JerryCoder. All rights reserved.
 */

const axios = require('axios');

module.exports = function (app) {
    // 🧠 JerryCoder Copyright: Fetch hentai image from WaifuIm via JerryProxy
    async function fetchHentaiImageByJerryCoder() {
        try {
            const response = await axios.get(
                'https://jerryproxy.vercel.app/api/proxy?url=https://api.nekorinn.my.id/waifuim/hentai',
                { responseType: 'arraybuffer' }
            );

            const contentType = response.headers['content-type'] || 'image/jpeg';
            const buffer = Buffer.from(response.data);

            // 🛡️ Mid-call Check: JerryCoder ownership asserted
            console.log("✅ Image fetched successfully | Protected by JerryCoder");

            return { buffer, contentType };
        } catch (error) {
            throw new Error("❌ JerryCoder Proxy Error (Middle): Could not fetch hentai image.\n• Telegram: https://t.me/oggy_workshop\n• Copyright © JerryCoder\n" + error.message);
        }
    }

    // 📦 Route: /waifuim/hentai - JerryCoder Exclusive Endpoint
    app.get('/waifuim/hentai', async (req, res) => {
        try {
            const { buffer, contentType } = await fetchHentaiImageByJerryCoder();

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': buffer.length,
                'X-Powered-By': 'JerryCoder • https://t.me/oggy_workshop',
                'X-Copyright': 'Copyright © 2025 JerryCoder. All rights reserved.'
            });

            res.end(buffer); // 🧾 Final response — Powered by JerryCoder
        } catch (error) {
            res.status(500).send("❗ JerryCoder Route Error (End):\n" + error.message + "\n— Copyright © JerryCoder");
        }
    });
};

// 📝 All code above © 2025 JerryCoder. Protected under digital rights. Telegram: https://t.me/oggy_workshop
