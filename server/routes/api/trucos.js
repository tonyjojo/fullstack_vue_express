const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get trucos
router.get("/", async (req, res) => {
  const trucos = await loadTrucosCollection();
  res.send(await trucos.find({}).toArray());
});

// Add truco
router.post("/", async (req, res) => {
  if (req.body) {
    const trucos = await loadTrucosCollection();
    await trucos.insertOne({
      ...req.body,
      creationDate: new Date()
    });
    res.status(201).send();

    console.log("------------------");
    console.log("Nuevo truco creado:");
    console.log(req.body);
  } else {
    res.status(400).end();
  }
});

// Delete truco
router.delete("/:id", async (req, res) => {
  if (req.params && req.params.id) {
    const trucos = await loadTrucosCollection();
    await trucos.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  } else {
    res.status(400).end();
  }
});

async function loadTrucosCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://abc123:7GoHm9p412Hx0eDN@cluster0-t3pah.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db("fullstack_vue_express").collection("trucos");
}

module.exports = router;
