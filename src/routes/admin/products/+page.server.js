import { createproduct, editproduct, deleteproduct } from '$lib/server/mongoActions.js'; 
import { getAllProducts } from '$lib/server/mongoLoads.js'; 

export const load = async () => {
    try {
      const { allBlogs, error } = await getAllProducts();
      return { allBlogs, error };
    } catch (error) {
      console.error("Error in load:", error);
      return {
        allBlogs: [],
        error: "Unexpected error loading blogs"
      };
    }
};
  
export const actions = {
//   createblogs: async ({ request }) => {
//     try {
//       const formData = await request.formData();
//       console.log(formData,"formData");
      
//       const body = Object.fromEntries(formData.entries());
//       // Convert image to base64 string
// if (imageFile && imageFile.size > 0) {
//   const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//   const base64Image = imageBuffer.toString('base64');
  
//   body.image = {
//     data: base64Image, // Store as base64 string
//     contentType: imageFile.type,
//     filename: imageFile.name,
//     size: imageFile.size,
//     uploadDate: new Date()
//   };
// }
//       const response = await createproduct(body);

//       return {
//         success: true,
//         message: response.message,
//       };
//     } catch (error) {
//       console.error('Error handling Blogs form:', error);
//       return {
//         success: false,
//         error: 'An unexpected error occurred. Please try again later.'
//       };
//     }
//   },
createblogs: async ({ request }) => {
  try {
    const formData = await request.formData();
    console.log(formData, "formData");
   
    const imageFile = formData.get("image");
    const body = Object.fromEntries(formData.entries());
    
   if (imageFile && imageFile.size > 0) {
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const base64Image = imageBuffer.toString('base64');
  body.image = `data:${imageFile.type};base64,${base64Image}`;
}
    
    const response = await createproduct(body);
    return {
      success: true,
      message: response.message,
    };
  } catch (error) {
    console.error('Error handling Blogs form:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    };
  }
},
  editblog: async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());

      // Get the blogId from the params and ensure it's passed correctly
      const blogId = body.id || params.id; // fallback to `params.id` if `body.id` is not available
      
      if (!blogId) {
        return {
          success: false,
          error: 'Blog ID is required to update the blog.',
        };
      }

      // Call your editBlog function or whatever logic you're using to update the blog
      const response = await editproduct(blogId, body);

      return {
        success: true,
        message: response.message, // response.message should be from your API or DB update response
      };
    } catch (error) {
      console.error('Error editing blog:', error);
      return {
        success: false,
        error: 'Failed to update blog. Please try again.',
      };
    }
  },

  deleteblog: async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());
  
      // Get blogId from form body or route params
      const blogId = body.id || params.id;
  
      if (!blogId) {
        return {
          success: false,
          error: "Blog ID is required to delete the blog.",
        };
      }
  
      const response = await deleteproduct(blogId);
  
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      console.error("Error deleting blog:", error);
      return {
        success: false,
        error: "Failed to delete blog. Please try again.",
      };
    }
  }  
};