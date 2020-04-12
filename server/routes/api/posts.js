const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add posts
router.post('/', async (req, res) => {
  if(req.body) {
    const posts = await loadPostsCollection();
    await posts.insertOne({
      text: req.body.text,
      creationDate: new Date()
    });
    res.status(201).send();

    console.log('------------------');
    console.log(`New post created: ${req.body.text}`);
  } else {
    res.status(400).end();
  }
})

// Delete post
router.delete('/:id', async (req, res) => {
  if(req.params && req.params.id) {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
  } else {
    res.status(400).end();
  }
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:7GoHm9p412Hx0eDN@cluster0-t3pah.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  return client.db('fullstack_vue_express').collection('posts');
}


module.exports = router;