const BatchModel = require('../models/batch');

const Create = async (data) => {
	const batch = new BatchModel(data);
	return await batch.save();
}

const Single = async (query) => {
	return await BatchModel.findOne(query);
}

const Index = async (query, page, size, sortQuery) => {
	if (!sortQuery) sortQuery = { updateAt: -1 };

	return await BatchModel.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.sort(sortQuery);;
}

const Count = async (query) => {
	return await BatchModel.countDocuments(query);
}

module.exports = {
	Create,
	Single,
	Index,
	Count
}