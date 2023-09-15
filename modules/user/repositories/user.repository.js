const UserModel = require('../models/user');

const Create = async (data) => {
	const user = new UserModel(data);
	return await user.save();
}

const Single = async (query) => {
	return await UserModel.findOne(query);
}

const Index = async (query, page, size, sortQuery) => {
	if (!sortQuery) sortQuery = { updateAt: -1 };

	return await UserModel.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.sort(sortQuery);;
}

const PartnerIndex = async (query, page, size, sortQuery) => {
	if (!sortQuery) sortQuery = { updateAt: -1 };

	return await UserModel.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.sort(sortQuery);;
}

const Count = async (query) => {
	return await UserModel.countDocuments(query);
}

module.exports = {
	Create,
	Single,
	Index,
	Count,
	PartnerIndex
}