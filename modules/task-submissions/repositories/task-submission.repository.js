const TaskModel = require('../models/task-submission');

const Create = async (data) => {
	const batch = new TaskModel(data);
	return await batch.save();
}

const Single = async (query) => {
	return await TaskModel.findOne(query).populate("task").populate("submittedBy");
}

const Index = async (query, page, size, sortQuery) => {
	if (!sortQuery) sortQuery = { updateAt: -1 };

	return await TaskModel.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.sort(sortQuery).populate("task").populate("submittedBy");
}

const Count = async (query) => {
	return await TaskModel.countDocuments(query);
}

module.exports = {
	Create,
	Single,
	Index,
	Count
}