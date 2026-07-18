const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let questions = [];

app.post("/questions", (req, res) => {
    const { name, email, question } = req.body;
    const newQuestion = {
        id: Date.now(),
        name,
        email,
        question,
        answer: null,
        timestamp: new Date().toLocaleString(),
        approved: false
    };
    questions.push(newQuestion);
    res.json({ success: true });
});

app.get("/questions", (req, res) => {
    res.json(questions);
});
app.post("/approve", (req, res) => {
    const { id } = req.body;
    const item = questions.find(q => q.id === id);
    if (item) {
        item.approved = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
app.post("/answer", (req, res) => {
    const { id, answer } = req.body;
    const item = questions.find(q => q.id === id);
    if (item) {
        item.answer = answer;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
app.post("/delete", (req, res) => {
    const { id } = req.body;
    questions = questions.filter(q => q.id !== id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
});

});
