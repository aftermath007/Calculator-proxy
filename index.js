const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (calculator UI)
app.use(express.static("public"));

// Proxy requests when user enters a URL
app.use(
    "/browse",
    createProxyMiddleware({
        target: "", // Dynamic target
        changeOrigin: true,
        router: (req) => {
            const targetUrl = req.query.url;
            if (targetUrl) {
                return targetUrl; // Redirect to entered website
            }
            return "https://www.google.com"; // Default if no URL provided
        },
        onError: (err, req, res) => {
            res.status(500).send("Proxy Error: " + err.message);
        }
    })
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});