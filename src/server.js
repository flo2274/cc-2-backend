const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

let data = [];

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/data", (req, res) => {
  const { name, description } = req.body;
  const newEntry = { id: Date.now(), name, description };
  data.push(newEntry);
  res.status(201).json(newEntry);
});

app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let updated = false;
  data = data.map((entry) => {
    if (entry.id == id) {
      entry.name = name || entry.name;
      entry.description = description || entry.description;
      updated = true;
      return entry;
    }
    return entry;
  });

  if (updated) {
    res.json({ message: "Eintrag aktualisiert!" });
  } else {
    res.status(404).json({ message: "Eintrag nicht gefunden" });
  }
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  data = data.filter((entry) => entry.id != id);

  res.json({ message: "Eintrag gelöscht" });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
