<script>
  let { id, sizes = "", alt = "" } = $props();
</script>

{#await import(`../../content/blog/${id}/thumbnail.jpg?enhanced&w=1000;800;600;400`)}
  <div class="skeleton w-full aspect-[3/2]"></div>
{:then { default: src }}
  <enhanced:img {src} {sizes} {alt} class="w-full rounded-box"></enhanced:img>
{/await}

<!-- svelte-ignore css_unused_selector -->
<style>
  picture {
    @apply m-0;
  }
</style>
