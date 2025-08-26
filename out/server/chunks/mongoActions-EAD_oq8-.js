import { C as Contact, E as Events, P as Partners, a as Component } from './Partners-CbwWoqw6.js';

const contactUs = async (body) => {
  console.log(body, "body");
  const { ...contact } = body;
  try {
    console.log("Saving contact data:", contact);
    const newContact = new Contact(body);
    const record = await newContact.save();
    return {
      success: true,
      message: "Contact details submitted successfully"
    };
  } catch (error) {
    console.error("Error saving contact details:", error);
    return {
      success: false,
      message: "Something went wrong while saving contact details"
    };
  }
};
const addEvent = async (body) => {
  if (body.previewText) {
    body.shortDescription = extractShortDescription(body.previewText);
  }
  const newNewsItem = new Events(body);
  await newNewsItem.save();
  return { status: 200 };
};
const updateEvent = async (body) => {
  if (body.image) {
    body.image = body.image.trim().replace(/\s?\(\d+\)\./, ".").replace(/[\\:*?"<>|()]/g, "-").replace(/[^a-zA-Z0-9.-]/g, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  }
  if (body.shortDescription) {
    body.shortDescription = body.shortDescription.trim().replace(/\s{2,}/g, " ");
  }
  if (body.previewText && !body.shortDescription) {
    body.shortDescription = extractShortDescription(body.previewText);
  }
  await Events.findByIdAndUpdate(body.id, {
    title: body.title,
    newsLink: body.newsLink,
    previewText: body.previewText,
    Keyword: body.Keyword,
    shortDescription: body.shortDescription
  });
  return { status: 200 };
};
async function deleteEvent(body) {
  await Events.findByIdAndDelete(body.id);
  return { status: 200 };
}
const createproduct = async (body) => {
  console.log(body, "body");
  try {
    const blogUrl = slugify(body.title);
    const newBlogs = new Component({
      ...body,
      blogUrl
    });
    const savedBlogs = await newBlogs.save();
    return {
      success: true,
      message: "Blogs created successfully"
    };
  } catch (error) {
    console.error("Error saving Blogs:", error);
    return {
      success: false,
      message: "Failed to submit Blogs form",
      error: error.message
    };
  }
};
function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const editproduct = async (id, body) => {
  try {
    if (body.title) {
      body.blogUrl = slugify(body.title);
    }
    const updatedBlog = await Component.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBlog) {
      return {
        success: false,
        message: "Blog not found"
      };
    }
    return {
      success: true,
      message: "Blog updated successfully"
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      message: "Failed to update blog",
      error: error.message
    };
  }
};
const deleteproduct = async (id) => {
  try {
    const deletedBlog = await Component.findByIdAndDelete(id);
    if (!deletedBlog) {
      return {
        success: false,
        message: "Blog not found"
      };
    }
    return {
      success: true,
      message: "Blog deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      success: false,
      message: "Failed to delete blog",
      error: error.message
    };
  }
};
const updatecontactstatus = async (body) => {
  await Contact.findByIdAndUpdate(body.userId, { status: body.status });
};
const createpartners = async (body) => {
  console.log(body, "bodyyyyyyyyyyyyyyyyyyyy");
  try {
    const partnerUrl = slugify(body.title);
    const newpartner = new Partners({
      ...body,
      partnerUrl
    });
    const savedBlogs = await newpartner.save();
    return {
      success: true,
      message: "Partners created successfully"
    };
  } catch (error) {
    console.error("Error saving Blogs:", error);
    return {
      success: false,
      message: "Failed to submit partners form",
      error: error.message
    };
  }
};
const editpartners = async (id, body) => {
  try {
    if (body.image && body.image instanceof File && body.image.size > 0) {
      const buffer = await body.image.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      body.image = `data:${body.image.type};base64,${base64}`;
    } else if (body.image && body.image instanceof File && body.image.size === 0) {
      delete body.image;
    }
    if (body.title) {
      body.blogUrl = slugify(body.title);
    }
    const updatedBlog = await Partners.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBlog) {
      return {
        success: false,
        message: "Blog not found"
      };
    }
    return {
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      message: "Failed to update blog",
      error: error.message
    };
  }
};
const deletepartners = async (id) => {
  try {
    const deletedBlog = await Partners.findByIdAndDelete(id);
    if (!deletedBlog) {
      return {
        success: false,
        message: "Blog not found"
      };
    }
    return {
      success: true,
      message: "Blog deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      success: false,
      message: "Failed to delete blog",
      error: error.message
    };
  }
};

export { updateEvent as a, addEvent as b, deletepartners as c, deleteEvent as d, editpartners as e, createpartners as f, deleteproduct as g, editproduct as h, createproduct as i, contactUs as j, updatecontactstatus as u };
//# sourceMappingURL=mongoActions-EAD_oq8-.js.map
