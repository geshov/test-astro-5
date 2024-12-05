<script>
  let { post, children } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>{post.data.title}</h1>

    {@render children()}
  </div>
</div>
