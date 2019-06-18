const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); //load this into mongoose
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
	name: {
		type: String, 
		required: true
	},
	image: {
		type: String,
		required: false,
		default: ' '
	},
	label: {
		type: String,
		required: false,
		default: ' '
	},
	description: {
		type: String, 
		required: false,
		default: ' '
	},
	featured: {
		type: Boolean,
		required: false,
		default: false
	}
},{
	timestamps: true
});


var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions;
