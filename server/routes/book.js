const express = require("express");
const router = express.Router();

// MODELS
const { Book } = require("../models/book");

// MIDDLEWARE
const { auth } = require("../middleware/auth");

router
  .route("/book")
  .get((req, res) => {
    let id = req.query.id;
    Book.find({ _id: id })
      // Ir a otra base de datos y buscar informacion ahi
      .populate("ownerId", "name lastname")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(...doc);
      });
  })
  .post(auth, (req, res) => {
    const book = new Book({
      ...req.body,
      ownerId: req.user._id,
    });
    book.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        post: true,
        bookID: doc._id,
      });
    });
  })
  .patch(auth, (req, res) => {
    Book.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
          succes: true,
          doc,
        });
      }
    );
  })
  .delete(auth, (req, res) => {
    let id = req.body.id;
    Book.findOneAndRemove(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(true);
    });
  });

router.route("/allbooks").get((req, res) => {
  ///localhost:3001/api/books/allbooks?skip=1&limit=2&order=asc
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let limit = req.query.limit ? parseInt(req.query.limit) : 50;
  let order = req.query.order ? req.query.order : "asc";
  let byOwner = req.query.ownerId ? { owner: req.query.ownerId } : {};

  Book.find(byOwner)
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});
module.exports = router;
