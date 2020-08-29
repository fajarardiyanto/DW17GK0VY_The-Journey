const { Bookmark, Trip, User } = require("../models");

exports.showBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Trip,
          as: "trip",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      order: [["id", "DESC"]],

      attributes: {
        exclude: ["bmUserId", "bmTripId", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      message: "response success",
      data: bookmark,
    });
  } catch (error) {
    response.status(400).send({
      error: err,
    });
  }
};

exports.userBookmark = async (req, res) => {
  try {
    const { bmUserId } = req.params;
    const getbookmark = await Bookmark.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Trip,
          as: "trip",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      order: [["id", "DESC"]],

      attributes: {
        exclude: ["bmUserId", "bmTripId", "createdAt", "updatedAt"],
      },
      where: {
        bmUserId: bmUserId,
      },
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!getbookmark)
      return res.status(400).send({
        message: `Data not found`,
      });

    res.status(200).send({
      data: getbookmark,
    });
  } catch (error) {
    response.status(400).send({
      error: err,
    });
  }
};

exports.createBookmark = async (req, res) => {
  try {
    const { bmUserId, bmTripId } = req.body;
    const checkBookmarkExist = await Bookmark.findOne({
      where: {
        bmUserId,
        bmTripId,
      },
    });

    if (checkBookmarkExist) {
      return res.status(400).send({
        status: false,
        error: {
          message: `Bookmark already exist`,
        },
      });
    }

    const addBookmark = await Bookmark.create(req.body);

    res.status(200).send({
      status: true,
      message: "Save to Bookmark",
      data: addBookmark,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error: err,
    });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    await Bookmark.destroy({
      where: {
        id,
      },
    });

    return res.status(200).send({ message: "Bookmark removed" });
  } catch (err) {
    res.status(400).send({
      errors: err,
    });
  }
};
