const router = require("express").Router();
const verify = require('../verifyToken');
const { index,show, remove,store } = require("../controller/postController");

router.get("/", verify, index);

router.get("/:id", verify,show );

router.delete("/:id", verify,remove)

router.post("/", verify, store)



module.exports = router;