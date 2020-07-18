const Post = require("../model/Post");


index = async (req, res) => {
  const post = await Post.find().select('_id title description');
  res.json({ post });
}

show = async (req, res) => {
  const post = await Post.find({ _id: req.params.id }).select('_id title description');
  res.json({ post });
}
remove = async (req, res) => {
  const post = await Post.deleteOne({ _id: req.params.id });
  res.json({ post });
}

store = async (req, res) => {


  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })

  try {
    const saved = await post.save();
    res.send(saved);

  } catch (error) {
    res.status(400).send({ error });
  }

}

// module.exports.index = index;
// module.exports.show = show;
// module.exports.remove = remove;
// module.exports.store = store;

module.exports = {index, show , remove, store}