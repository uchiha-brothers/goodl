/**
 * WaifuIm NSFW API - Waifuim Image Fetcher
 * • Creator: JerryCoder
 * • Telegram: https://t.me/oggy_workshop
 * • Copyright © 2025 by JerryCoder. All rights reserved.
 */

const axios = require('axios');

module.exports = function (app) {
    // 🧠 JerryCoder Copyright: Fetch waifuim image from WaifuIm via JerryProxy
    async function fetchHentaiImage() {
        try {
            const response = await axios.get(
                'https://jerryproxy.vercel.app/api/proxy?url=https://jerrycoder.oggyapi.workers.dev/waifuv2',
                { responseType: 'arraybuffer' }
            );

            const contentType = response.headers['content-type'] || 'image/jpeg';
            const buffer = Buffer.from(response.data);

            // 🛡️ Mid-call Check: JerryCoder ownership asserted
            return { buffer, contentType };
        } catch (error) {
            throw new Error("JerryCoder Proxy Error (Middle): Could not fetch waifuim image.\n• Telegram: https://t.me/oggy_workshop\n• Copyright © JerryCoder: " + error.message);
        }
    }

     // 📦 Route: /waifuim - JerryCoder Exclusive Endpoint
    app.get('/waifuim/neko', async (req, res) => {
        try {
            const { buffer, contentType } = await fetchHentaiImage();

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': buffer.length
            });

            res.end(buffer); // 🧾 Final response — Powered by JerryCoder
        } catch (error) {
            res.status(500).send("JerryCoder Route Error (End):\n" + error.message + "\n— Copyright © JerryCoder");
        }
    });
};

// 📝 All code above © 2025 JerryCoder. Protected under digital rights. Telegram: https://t.me/oggy_workshop
