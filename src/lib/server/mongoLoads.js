import Contactus from '$lib/server/models/Contact.js';
import Events from '$lib/server/models/Events.js';
import Products from '$lib/server/models/Component.js'
import Partners from '$lib/server/models/Partners';
export async function fetchContacts(currentPage, search, filter) {
  if (!filter) {
    filter = "unread";
  }
  let page = currentPage || 1
  let pageSize = 10
  let dataFilter = {}
  if (search) {
    dataFilter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } }]
  }
  if (filter !== "all") {
    dataFilter.status = filter;
  }
  const records = JSON.parse(JSON.stringify(await Contactus.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Contactus.countDocuments(dataFilter)))
  return { records, totalCount };
}
export const getAllProducts = async () => {
  try {
    const allBlogsRaw = await Products.find();

    const allBlogs = allBlogsRaw.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      image: blog.image,
    }));

    return { allBlogs };
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    return {
      message: "Failed to fetch Blogs",
    };
  }
};
export const getAllCategories = async () => {
  try {
    const categories = await Products.find().sort({ name: 1 });
    console.log('-----mongo categories---', categories);
    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return {
      categories: [],
      error: 'Failed to load categories'
    };
  }
};
export async function getprodustsdata(currentPage, search, filter) {
  //   console.log("currentPage", currentPage);
  //    console.log("search in server", search);
  //    console.log("filter in server", filter);
  let page = currentPage || 1
  let pageSize = 12
  let dataFilter = {}
  if (search) {
    dataFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { Keyword: { $regex: search, $options: "i" } }
    ]
  } else if (filter && filter !== "all") {
    dataFilter.status = filter
  }

  const records = JSON.parse(JSON.stringify(await Products.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Products.countDocuments(dataFilter)))
  //   console.log("records",records);
  return { records, totalCount };
}
export async function getNewsData(currentPage, search, filter) {
  //   console.log("currentPage", currentPage);
  //    console.log("search in server", search);
  //    console.log("filter in server", filter);
  let page = currentPage || 1
  let pageSize = 12
  let dataFilter = {}
  if (search) {
    dataFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { Keyword: { $regex: search, $options: "i" } }
    ]
  } else if (filter && filter !== "all") {
    dataFilter.status = filter
  }

  const records = JSON.parse(JSON.stringify(await Events.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Events.countDocuments(dataFilter)))
  //   console.log("records",records);
  return { records, totalCount };
}
export async function getSingleNewsData(link) {
  console.log(link, "linkkkkkkkkkkk");

  const records = await Events.findOne({ newsLink: link });
  console.log("Fetched records:", records);
  if (records) {
    return records;
  } else {
    return { error: 'News data not found' };
  }
}
export async function eventslist(currentPage, search, filter) {
  let page = currentPage || 1
  let pageSize = 10
  let dataFilter = {}
  if (search) {
    dataFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { Keyword: { $regex: search, $options: "i" } }]
  } else if (filter && filter !== "all") {
    dataFilter.status = filter
  }
  const records = JSON.parse(JSON.stringify(await Events.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Events.countDocuments(dataFilter)))
  return { records, totalCount };
}

export async function newsroom(currentPage,search,filter) {
  let page = currentPage || 1
  let pageSize = 10
  let dataFilter = {}
  if(search){
    dataFilter.$or = [
      {title: { $regex: search, $options: "i" }},
      {Keyword: { $regex: search, $options: "i" } }]
  }else if(filter && filter !== "all"){
    dataFilter.status = filter
  }
  const records = JSON.parse(JSON.stringify(await Events.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize))); 
  const totalCount = JSON.parse(JSON.stringify(await Events.countDocuments(dataFilter)))
  return {records,totalCount};
}

export const getAllpartners = async () => {
  try {
    const allBlogsRaw = await Partners.find();

    const allBlogs = allBlogsRaw.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      image: blog.image,
      location :blog.location,
    }));

    return { allBlogs };
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    return {
      message: "Failed to fetch Blogs",
    };
  }
};


export async function getpartnerssdata(currentPage, search, filter) {
  //   console.log("currentPage", currentPage);
  //    console.log("search in server", search);
  //    console.log("filter in server", filter);
  let page = currentPage || 1
  let pageSize = 12
  let dataFilter = {}
  if (search) {
    dataFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { Keyword: { $regex: search, $options: "i" } }
    ]
  } else if (filter && filter !== "all") {
    dataFilter.status = filter
  }

  const records = JSON.parse(JSON.stringify(await Partners.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Partners.countDocuments(dataFilter)))
  //   console.log("records",records);
  return { records, totalCount };
}