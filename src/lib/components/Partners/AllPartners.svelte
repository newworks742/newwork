<script>
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  export let allBlogs;
  // console.log(allBlogs,"bloggggggggggggggggg");
  
  export let searchQuery = "";

  $: filteredBlogs = allBlogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dispatch = createEventDispatcher();
</script>

<div
  class="w-full border-t-1 border-b-1 border-l-1 overflow-auto rounded scroll-bar"
>
  <table class="w-full border-r-1 border-collapse rounded text-sm">
    <thead>
      <tr class="font-medium bg-gray-100 sticky top-0 text-left">
        <th class="px-4 py-2 border">Title</th>
        <th class="px-4 py-2 border">Location</th>
        <th class="px-4 py-2 border">Description</th>
        <th class="px-4 py-2 border">Image</th>
        <th class="px-4 py-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredBlogs as blog}
        <tr class="border-t border-gray-300 text-left align-top">
          <td class="px-4 py-3">{blog.title.slice(0, 100)}...</td>
          {#if blog?.location?.length}
           <td class="px-4 py-3">{blog?.location}</td>
           {:else}---
           {/if}
          <td class="px-4 py-3">{@html blog.content.slice(0, 100)}...</td>
          <td class="px-4 py-3">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
              src={blog.image}
              class="h-16 w-16 border rounded object-cover"
            />
          </td>
          <td class="px-4 py-3 my-3 flex items-center justify-center">
            <div class="flex gap-2 items-center">
              <!-- Edit Button with Icon -->
              <button
                class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-white hover:text-gray-700 border border-gray-700 flex items-center gap-1"
                on:click={() => dispatch("edit", blog)}
              >
                <Icon icon="ic:sharp-mode-edit" class="text-xl" />
              </button>
              <!-- Delete Button with Icon -->
              <form
                method="POST"
                action="?/deletepartner"
                on:submit|preventDefault={(e) => {
                  const confirmed = confirm(
                    "Are you sure you want to delete this blog?"
                  );
                  if (!confirmed) return;
                  e.target.submit();
                }}
              >
                <input type="hidden" name="id" value={blog.id} />
                <button
                  type="submit"
                  class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-white hover:text-gray-700 border border-gray-700 flex items-center gap-1"
                >
                  <Icon icon="bi:trash" class="text-xl" />
                </button>
              </form>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
