import { C as Contact, E as Events, P as Partners, a as Component } from './Partners-CbwWoqw6.js';

async function fetchContacts(currentPage, search, filter) {
  if (!filter) {
    filter = "unread";
  }
  let page = currentPage || 1;
  let pageSize = 10;
  let dataFilter = {};
  if (search) {
    dataFilter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } }
    ];
  }
  if (filter !== "all") {
    dataFilter.status = filter;
  }
  const records = JSON.parse(JSON.stringify(await Contact.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Contact.countDocuments(dataFilter)));
  return { records, totalCount };
}
const getAllProducts = async () => {
  try {
    const allBlogsRaw = await Component.find();
    const allBlogs = allBlogsRaw.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      image: blog.image
    }));
    return { allBlogs };
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    return {
      message: "Failed to fetch Blogs"
    };
  }
};
async function getprodustsdata(currentPage, search, filter) {
  let page = 1;
  let pageSize = 12;
  let dataFilter = {};
  const records = JSON.parse(JSON.stringify(await Component.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Component.countDocuments(dataFilter)));
  return { records, totalCount };
}
async function getNewsData(currentPage, search, filter) {
  let page = 1;
  let pageSize = 12;
  let dataFilter = {};
  const records = JSON.parse(JSON.stringify(await Events.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Events.countDocuments(dataFilter)));
  return { records, totalCount };
}
async function getSingleNewsData(link) {
  console.log(link, "linkkkkkkkkkkk");
  const records = await Events.findOne({ newsLink: link });
  console.log("Fetched records:", records);
  if (records) {
    return records;
  } else {
    return { error: "News data not found" };
  }
}
async function newsroom(currentPage, search, filter) {
  let page = currentPage || 1;
  let pageSize = 10;
  let dataFilter = {};
  if (search) {
    dataFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { Keyword: { $regex: search, $options: "i" } }
    ];
  } else if (filter && filter !== "all") {
    dataFilter.status = filter;
  }
  const records = JSON.parse(JSON.stringify(await Events.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Events.countDocuments(dataFilter)));
  return { records, totalCount };
}
const getAllpartners = async () => {
  try {
    const allBlogsRaw = await Partners.find();
    const allBlogs = allBlogsRaw.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      image: blog.image,
      location: blog.location
    }));
    return { allBlogs };
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    return {
      message: "Failed to fetch Blogs"
    };
  }
};
async function getpartnerssdata(currentPage, search, filter) {
  let page = 1;
  let pageSize = 12;
  let dataFilter = {};
  const records = JSON.parse(JSON.stringify(await Partners.find(dataFilter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)));
  const totalCount = JSON.parse(JSON.stringify(await Partners.countDocuments(dataFilter)));
  return { records, totalCount };
}

export { getAllProducts as a, getNewsData as b, getSingleNewsData as c, getpartnerssdata as d, getprodustsdata as e, fetchContacts as f, getAllpartners as g, newsroom as n };
//# sourceMappingURL=mongoLoads-BzQOnEVI.js.map
