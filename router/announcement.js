const router = require("express").Router();
const Announcement = require("../models/announcement");
const { requireLogin } = require("../middleware/auth");

router.post("/announcement",requireLogin, (req, res) => {
  var { des } = req.body;
  if (!des) {
    return res.status(400).json({ error: "This field can't be empty" });
  }
  const postData = Announcement({ des,postedBy: req.user });
  Announcement.create(postData)
    .then((result) => {
      res.json({ result, message: "Announcement published" });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.delete("/deleteannounce/:id", requireLogin, (req, res) => {
  var deleteData = { _id: req.params.id };
  Announcement.findByIdAndDelete(deleteData)
    .then((deleteData) => {
      res.json(deleteData);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all the post
router.get("/getannouncement", requireLogin, (req, res) => {
  Announcement.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name email")
    .then((mypostdata) => {
      res.json(mypostdata);
    })
    .catch((err) => {
      console.log(err);
    });
});







module.exports = router;
