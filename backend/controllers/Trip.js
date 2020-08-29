const { Trip, User } = require("../models");
const joi = require("@hapi/joi");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      ...req.body,
    });

    if (trip) {
      const tripResult = await Trip.findOne({
        where: {
          id: trip.id,
        },
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return res.status(200).send({
        data: tripResult,
      });
    } else {
      return res.status(400).send({
        error: {
          message: "Try again",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errors: err,
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trip = await Trip.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (trip) {
      return res.status(200).send({
        data: trip,
      });
    } else {
      return res.status(400).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (trip) {
      return res.status(200).send({
        data: trip,
      });
    } else {
      return res.status(400).send({
        message: "Trip not found!",
      });
    }
  } catch (err) {
    return res.send(400).send({
      errors: err,
    });
  }
};

exports.getTripByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const trip = await Trip.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (trip) {
      return res.status(200).send({
        data: {
          trip,
        },
      });
    } else {
      return res.status(400).send({
        message: "Trip not found!",
      });
    }
  } catch (err) {
    return res.send(400).send({
      errors: err,
    });
  }
};
