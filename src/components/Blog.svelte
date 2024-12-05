<script>
  let { blog } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>Блог</h1>

    <div class="space-y-2">
      {#each blog as post}
        <a href="/posts/{post.id}" class="flex gap-6 link link-primary">
          <div class="w-24">{post.data.date.toLocaleDateString("ru-RU")}</div>
          <div>{post.data.title}</div>
        </a>
      {/each}
    </div>
  </div>
</div>
