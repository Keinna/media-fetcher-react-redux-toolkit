const express = require("express");
const path = require("path");

const app = express();

// Stel de map in waarin de gebouwde React-bestanden zich bevinden
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Stuur alle verzoeken naar de React-applicatie
app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Start de server
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`De app is beschikbaar op http://localhost:${port}`);
});
