const jwt = require('jsonwebtoken');

const generateJWTToken = (user) => {
	const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
		expiresIn: '365d',
	});
	return accessToken;
};

module.exports = generateJWTToken;
