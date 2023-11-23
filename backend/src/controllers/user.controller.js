const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
  } = require('../services/user.service')


async function createUserController(req, res, next) {
    try {
        res.json(await createUser());
    } catch (err) {
        next(err);
    }
}
async function getUserController(req, res, next) {
    try {
        res.json(await getUser());
    } catch (err) {
        next(err);
    }
}
async function getAllUsersController(req, res, next) {
    try {
        res.json(await getAllUsers());
    } catch (err) {
        next(err);
    }
}
async function updateUserController(req, res, next) {
    try {
        res.json(await updateUser());
    } catch (err) {
        next(err);
    }
}

async function deleteUserController(req, res, next) {
    try {
        res.json(await deleteUser());
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
    deleteUserController
}