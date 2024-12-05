<script>
  let { blog } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>Блог</h1>

    <div class="space-y-8">
      {#each blog as post}
        <a href="/posts/{post.id}" class="flex gap-4 link link-primary">
          <div class="w-44 shrink-0">
            {#await import(`../../content/blog/${post.id}/thumbnail.jpg`) then img}
              <img
                src={img.default.src}
                class="m-0 rounded-box"
                alt={post.data.title} />
            {/await}
          </div>

          <div class="space-y-2">
            <div class="text-xs">
              {post.data.date.toLocaleDateString("ru-RU")}
            </div>
            <div>{post.data.description}</div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
