<script>
  import { onMount, tick } from "svelte";
  import BlogList from "$lib/components/Blogs/BlogList.svelte";
  import AllBlogs from "$lib/components/Blogs/AllBlogs.svelte";
  export let data;

  let isEditing = false;
  let blogToEdit = null;
  let showForm = false;
  let searchQuery = "";

  function openEditForm(blog) {
    blogToEdit = null;
    showForm = false;

    tick().then(() => {
      blogToEdit = blog;
      isEditing = !!blog;
      showForm = true;
    });
  }

  function handleCloseForm() {
    blogToEdit = null;
    isEditing = false;
    showForm = false;
  }

  function resetForm() {
    openEditForm(null);
  }
</script>

<div
  class="mb-4 flex flex-wrap items-center gap-4 bg-gray-300 justify-between p-4 rounded"
>
  <h1 class="text-2xl font-bold w-full sm:w-auto">Products</h1>

  <input
    type="text"
    bind:value={searchQuery}
    placeholder="Search Blogs..."
    class="border-gray-300 rounded-md shadow-sm w-full sm:w-80 focus:ring-0"
  />

  <button
    on:click={resetForm}
    class="bg-gray-700 text-white border px-5 py-1 rounded hover:bg-white hover:text-gray-700 border-gray-700 w-full sm:w-auto"
  >
    Add New Product
  </button>
</div>

<BlogList {isEditing} {blogToEdit} {showForm} on:closeForm={handleCloseForm} />
<AllBlogs
  blogData={data.allBlogs}
  {searchQuery}
  on:edit={(e) => openEditForm(e.detail)}
/>
