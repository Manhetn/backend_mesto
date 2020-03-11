const mongoose = require("mongoose");

const User = require("../models/user");

const { ObjectId } = mongoose.Types;
// возвращает всех пользователей
const readUsers = (req, res) => {
  User.find(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Что-то пошло не так :(",
        error: err
      })
    );
};
// возвращает пользователя по _id
const readUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send({ message: "Невалидный id" });
    return;
  }
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "Пользователь не существует" });
      }
    })
    .catch(err =>
      res.status(500).send({
        message: "Ощибка на сервере",
        error: err
      })
    );
};
// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.user._id);
  console.log(req.params);
  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка создания пользователя",
        error: err
      })
    );
};
// обновляет профиль
const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка обновления информации пользователя",
        error: err
      })
    );
};
// обновляет аватар
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err =>
      res.status(500).send({
        message: "Ошибка обновления ававтара пользователя",
        error: err
      })
    );
};

module.exports = {
  readUsers,
  readUser,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
