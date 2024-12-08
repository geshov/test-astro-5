<script>
  let { blog } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>Блог</h1>

    <div class="space-y-10">
      {#each blog as post}
        <a
          href="/posts/{post.id}"
          class="grid grid-cols-1 sm:grid-cols-5 gap-4 no-underline">
          <div class="sm:col-span-2">
            <img
              src={post.data.thumbnail.src}
              srcset={post.data.thumbnail.srcSet.attribute}
              sizes="(min-width: 640px) 245px, 90vw"
              class="rounded-box m-0"
              alt={post.data.title}
              {...post.data.thumbnail.attributes} />
          </div>

          <div class="space-y-0 sm:col-span-3">
            <div class="text-sm">
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
