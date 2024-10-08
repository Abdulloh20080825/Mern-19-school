const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		books: { type: Array, default: [] },
		password: { type: String, required: true },
		classNum: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
