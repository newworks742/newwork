import mongoose from 'mongoose';

// Define the Component schema
const componentSchema = new mongoose.Schema(
	{

		title: { type: String },
		content: { type: String },
		image: { type: String },
		
	},
	{
		timestamps: true, // Automatically creates createdAt and updatedAt fields
		collection: 'products',
	}
);

// Create the model for the Component schema
export const Component = mongoose.models.Component || mongoose.model('Component', componentSchema);

export default Component;
