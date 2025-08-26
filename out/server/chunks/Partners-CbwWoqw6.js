import mongoose from 'mongoose';

const { Schema: Schema$1 } = mongoose;
const contactUSSchema = new Schema$1(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: false,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      trim: true
    },
    country: {
      type: String,
      required: false,
      trim: true
    },
    subject: {
      type: String,
      required: false,
      trim: true
    },
    message: {
      type: String,
      required: false,
      trim: true
    },
    phone: {
      type: Number,
      required: false,
      min: null,
      max: null
    },
    status: {
      type: String,
      default: "unread"
    }
  },
  {
    timestamps: true,
    collection: "contactus"
  }
);
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactUSSchema);
const { Schema } = mongoose;
const newsroomSchema = new Schema(
  {
    title: {
      type: String
    },
    previewText: {
      type: String
    },
    image: {
      type: String
    },
    newsLink: {
      type: String
    },
    Keyword: {
      type: String
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    },
    shortDescription: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: "Events"
  }
);
const Events = mongoose.models.Events || mongoose.model("Events", newsroomSchema);
const componentSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    image: { type: String }
  },
  {
    timestamps: true,
    // Automatically creates createdAt and updatedAt fields
    collection: "products"
  }
);
const Component = mongoose.models.Component || mongoose.model("Component", componentSchema);
const partnerSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    image: { type: String },
    location: { type: String }
  },
  {
    timestamps: true,
    collection: "partners"
  }
);
const Partners = mongoose.models.Partners || mongoose.model("Partners", partnerSchema);

export { Contact as C, Events as E, Partners as P, Component as a };
//# sourceMappingURL=Partners-CbwWoqw6.js.map
