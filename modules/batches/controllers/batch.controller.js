/**
 * User CRUD Controller
 * 
 * @by nirob
 * @since 1.0
 */


const BatchRepo = require('../repositories/batch.repository');
/* Router Methods */

exports.Index = async (req, res, next) => {
    console.log("req: ", req);
    var query = { status: 'active' },
        page = 1,
        size = 100;

    if ('page' in req.query) page = parseInt(req.query.page);
    if ('size' in req.query) size = parseInt(req.query.size);

    try {
        let batches = await BatchRepo.Index(query, page, size);

        res.status(200).json({ data: batches })

    } catch (error) {
        console.error(error);
        return next(error);
    }

};


exports.Add = async (req, res, next) => {
    let body = req.body;
    try {
        let batch = await BatchRepo.Create(body);
        res.status(200).json({ message: "Created successfully", data: batch })
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.Edit = async (req, res, next) => {
    let batch = req.model;
    Object.assign(batch, req.body);
    console.log("edit: ", req);

    try {
        let updatedBatch = await batch.save();
        res.status(200).json({ message: "Updated successfully", data: updatedBatch })
    } catch (error) {
        console.error(error);
        return next(error);
    }
}


exports.Single = function (req, res, next) {

    return res.json(req.model);

};

