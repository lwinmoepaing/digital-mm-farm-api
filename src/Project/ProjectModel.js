const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose


/**
 * Create Project Schema
 * @doc : Project Scalable Schema
 */
const projectSchema = new Schema({
	headImg: {
		type: String,
		default: '/wallpaper/wallpaper.jpg'
	},
	title: {
		type: String,
		index: true,
		required: true
	},
	body: [String],

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
	attachmentImg: [ String ],

	// For Pending State
	projectDuration: {
		type: String,
		required: true
	},
	projectExpiredDate: {
		type: Date,
		required: true,
		index: true
	},
	// For Working State
	projectStartDate: Date,
	projectEndDate: Date,
	projectCategory: {
		type: String,
		enum: ['Agriculture', 'AnimalHusbandry', 'Both'],
		index: true,
		required: true,
	},
	projectCreateBy: {
		type: String,
		enum: ['Farmer', 'User'],
		index: true,
		required: true,
	},

	// Status
	status: {
		type: String,
		enum: ['Pending', 'Reject', 'Expired', 'Working', 'Finished'],
		index: true,
		default: 'Pending',
		required: true
	},

	// Interested User Array
	interestedUsers: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	}],

	// Contact User Array
	contactUsers: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	}],

	// For Staffs
	assignedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
	acceptedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
	isClosed: {
		type: Boolean,
		default: false,
		required: true,
		index: true
	}
}, {
	timestamps: true,
})

// Plugin Paginate
projectSchema.plugin(mongoosePaginate)

const Project = mongoose.model('Project', projectSchema)
// Export Project
module.exports = Project
