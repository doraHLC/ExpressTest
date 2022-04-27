var express = require('express');
var router = express.Router();
const Post = require('../models/movieModel');
const errorHandle = require('../errorHandle');


router.get('/', async function (req, res, next) {
  const posts = await Post.find();
  // res.send('respond with a resource');
  res.send({
    "status": "成功取得所有資料",
    posts
  })
});

router.post('/', async function (req, res, next) {
  try {
    const data = req.body;
    const newPost = await Post.create(
      {
        movie: data.movie,
        name: data.name,
        content: data.content,
        likes: data.likes
      }
    );
    res.send({
      "status": "成功新增新貼文",
      data: newPost
    });
  } catch (error) {
    errorHandle(res);
  }
});

router.delete('/', async function (req, res, next) {
  const posts = await Post.deleteMany({})
  res.send({
    "status": "成功刪除所有貼文",
    posts: []
  })
});

router.delete('/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    if (id !== undefined) {
      await Post.findByIdAndDelete(id);
      await res.send({
        "status": "成功刪除一則貼文",
        "data": null,
      });
    };
  }
  catch (error) {
    errorHandle(res);
  }
});

router.patch('/:id', async function (req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const posts = await Post.find();
    const index = posts.findIndex(element => element.id === id);
    await Post.findByIdAndUpdate(id, {
      "movie": data.movie,
      "name": data.name,
      "content": data.content,
      "likes": data.likes
    });
    await res.send({
      "status": "成功修改貼文內容",
      "data": posts[index]
    });
  } catch {
    errorHandle(res)
  }
});

module.exports = router;
