const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
	name: {
		type: String, 
		required: true,
		unique: true		
	},
	image: {
		type: String,
		required: false
	},
	designation: {
		type: String,
		required: true
	},
	abbr:	{
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	featured: {
		type: Boolean,
		required: true,
		default: false
	}
},{
	timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);
module.exports = Leaders;
