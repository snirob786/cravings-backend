/**
 * User CRUD Controller
 * 
 * @by nirob
 * @since 1.0
 */


const TaskRepo = require('../repositories/task.repository');
/* Router Methods */

exports.Index = async (req, res, next) => {
    var query = { status: 'active' },
        page = 1,
        size = 100;

    if ('page' in req.query) page = parseInt(req.query.page);
    if ('size' in req.query) size = parseInt(req.query.size);

    try {
        let tasks = await TaskRepo.Index(query, page, size);

        res.status(200).json({ data: tasks })

    } catch (error) {
        console.error(error);
        return next(error);
    }

};


exports.Add = async (req, res, next) => {
    let body = req.body;
    let user = req.user;
    body.postedBy = user.id
    try {
        let task = await TaskRepo.Create(body);
        res.status(200).json({ message: "Created successfully", data: task })
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.Edit = async (req, res, next) => {
    let task = req.model;
    Object.assign(task, req.body);

    try {
        let updatedTask = await task.save();
        res.status(200).json({ message: "Updated successfully", data: updatedTask })
    } catch (error) {
        console.error(error);
        return next(error);
    }
}


exports.Single = function (req, res, next) {

    return res.json(req.model);

};

