import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
	{

		title: { type: String },
		content: { type: String },
		image: { type: String },
        location :{type:String},
		
	},
	{
		timestamps: true, 
		collection: 'partners',
	}
);
export const Partners = mongoose.models.Partners || mongoose.model('Partners', partnerSchema);

export default Partners;
