const router = require("express").Router();
const Announcement = require("../models/announcement");
const { requireLogin } = require("../middleware/auth");

router.post("/announcement", (req, res) => {
  var { des } = req.body;

  if (!des) {
    return res.status(400).json({ error: "This field can't be empty" });
  }

  const postData = Announcement({ des });

  Announcement.create(postData)
    .then((result) => {
      res.json({ result, message: "Announcement published" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", requireLogin, (req, res) => {
  var deleteQuery = { _id: req.params.id };
  Announcement.findByIdAndDelete(deleteQuery)
    .then((resultDelete) => {
      res.json(resultDelete);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all the post

router.get("/getannouncement", (req, res) => {
  Announcement.find({})
    .sort({ date: "DESC" })
    .then((resultGet) => {
      res.json(resultGet);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
