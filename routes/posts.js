const express = require('express')
const router = express.Router()
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//GET ALL THE POSTS FROM DB
router.get('/:userId', auth, async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.userId })

    console.log(req.params.userId);
    res.json(post);
    console.log("post",post);
  } catch (error) {
    res.json({ message: error })
  }
})

//GET THE SPECIFIC POST FROM DB
router.get('/:postID', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID)
    res.json(post)
  } catch (error) {
    res.json({ message: error })
  }
})

//SUBMIT POST
router.post('/', auth, async (req, res) => {

  console.log(req.body)

  const post = new Post({
    userId: req.body.userId,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  })
  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

//UPDATE A POST
router.patch('/:postID', auth, async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postID },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
        },
      }
    )
    res.json(updatedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

//DELETE A POST
router.delete('/:postID', auth, async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postID })
    res.json(removedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
