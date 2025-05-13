const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = "messages.json";

app.use(cors());
app.use(express.json());

// Load messages from file
function loadMessages() {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Save messages to file
function saveMessages(messages) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

// Get all messages
app.get("/api/messages", (req, res) => {
    const messages = loadMessages();
    res.json(messages);
});

// Post a new message
app.post("/api/messages", (req, res) => {
    const newMessage = req.body;
    const messages = loadMessages();
    messages.push(newMessage);
    saveMessages(messages);
    res.json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
