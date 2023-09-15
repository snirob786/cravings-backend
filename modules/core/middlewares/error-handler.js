module.exports = (error, req, res, next) => {
	if (error.message) console.log(error.message);
	return res.status(500).json({ message: "Something went wrong.", error })
}