const TaskModel = require('../models/task');

const Create = async (data) => {
	const batch = new TaskModel(data);
	return await batch.save();
}

const Single = async (query) => {
	return await TaskModel.findOne(query).populate("postedBy");
}

const Index = async (query, page, size, sortQuery) => {
	if (!sortQuery) sortQuery = { updateAt: -1 };

	return await TaskModel.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.sort(sortQuery).populate("postedBy");
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