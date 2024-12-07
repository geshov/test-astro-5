<script>
  import Thumbnail from "./Thumbnail.svelte";

  let { post, children } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>{post.data.description}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
      <div>
        <Thumbnail
          id={post.id}
          sizes="(min-width: 640px) 310px, 90vw"
          alt={post.data.title} />
      </div>

      <div class="flex justify-center items-center">
        <div class="text-2xl font-bold">
          {post.data.date.toLocaleDateString("ru-RU")}
        </div>
      </div>
    </div>

    {@render children()}
  </div>
</div>
