<script>
  import Thumbnail from "./Thumbnail.svelte";

  let { blog } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>Блог</h1>

    <div class="space-y-10">
      {#each blog as post}
        <a
          href="/posts/{post.id}"
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 no-underline">
          <div>
            <Thumbnail
              id={post.id}
              sizes="(min-width: 640px) 201px, 90vw"
              alt={post.data.title} />
          </div>

          <div class="space-y-0 sm:col-span-2">
            <div class="text-sm text-info">
              {post.data.date.toLocaleDateString("ru-RU")}
            </div>

            <h2 class="link link-primary">
              {post.data.description}
            </h2>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
