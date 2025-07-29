const axios = require('axios');

module.exports = function (app) {
    async function fetchWaifuURL() {
        try {
            const { data } = await axios.get('https://jerrycoder.oggyapi.workers.dev/waifuv2?json=true');
            if (!data || !data.url) {
                throw new Error("Invalid response from waifu API");
            }
            return data.url;
        } catch (error) {
            throw error;
        }
    }

    // HTML page with image + try again button
    app.get('/random/waifu', async (req, res) => {
        try {
            const imageUrl = await fetchWaifuURL();

            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Random Waifu</title>
                    <style>
                        body {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            background: #121212;
                            color: #fff;
                            font-family: sans-serif;
                        }
                        img {
                            max-width: 90%;
                            max-height: 80vh;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(255,255,255,0.2);
                        }
                        button {
                            margin-top: 20px;
                            padding: 10px 20px;
                            font-size: 16px;
                            background: #1f80e0;
                            color: #fff;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                        }
                        button:hover {
                            background: #1464b8;
                        }
                    </style>
                </head>
                <body>
                    <img src="${imageUrl}" alt="Waifu Image">
                    <form method="get" action="/random/waifu">
                        <button type="submit">🔁 Try Again</button>
                    </form>
                </body>
                </html>
            `;

            res.setHeader('Content-Type', 'text/html');
            res.send(html);

        } catch (error) {
            res.status(500).send(`<h1>Error:</h1><pre>${error.message}</pre>`);
        }
    });
};
