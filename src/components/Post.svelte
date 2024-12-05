<script>
  let { post, children } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>{post.data.description}</h1>

    {@render children()}
  </div>
</div>
