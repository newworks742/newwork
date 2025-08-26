// import { validateLoginSession } from '$lib/server/loads.js';
import { newsroom } from '$lib/server/mongoLoads.js';
import { fail } from '@sveltejs/kit';
import { addEvent, deleteEvent, updateEvent } from '$lib/server/mongoActions.js'

export async function load({ parent, url, fetch }) {
  // await validateLoginSession(parent);
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("search");
  const filter = url.searchParams.get("filter");
  let news = [];
  let submissions = [];
  try {
    news = await newsroom(page, search, filter);
  } catch (error) {
    console.error("Failed to load data:", error);
    return { data: null, error: error.message || 'An unknown error occurred' };
  }
  return {
    news,
    records: submissions
  };
}

export const actions = {
  addnewsroom: async ({ request }) => {
    const formData = await request.formData();

    const fileName = formData.get("fileName");
    // console.log('newsformdata-->',formData);

    const body = Object.fromEntries(formData);
    // console.log('newsbody-->',body)

    try {
      console.log('Adding news item:', body);
      if (!body.newsLink) {
        body.newsLink = body.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/-$/, "");
      }

      //   console.log('NeswsAdded Data-->>',body);

      const result = await addEvent(body, fileName);
      return { status: 200, message: result.message };
    } catch (error) {
      console.error("Error during news addition:", error);
      return fail(500, {
        error: true,
        message: error.message || 'Failed to add news item'
      });
    }
  },

  updatenewsroom: async ({ request }) => {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    try {
      //   console.log('Updating news item:', body);

      if (!body.newsLink) {
        body.newsLink = body.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/-$/, "");
      }

      const result = await updateEvent(body);
      return { status: 200, message: result.message };
    } catch (error) {
      console.error("Error during news update:", error);
      return fail(500, {
        error: true,
        message: error.message || 'Failed to update news item'
      });
    }
  },

  deletenews: async ({ request }) => {
    const body = Object.fromEntries(await request.formData())
    try {
      const result = await deleteEvent(body);
      return result
    } catch (error) {
      console.error("Error during user update:", error);
    }
  }
}