<script>
  let { post, sizes = "", class: className = "" } = $props();
</script>

<img
  src={post.data.thumbnail.src}
  srcset={post.data.thumbnail.srcSet.attribute}
  {sizes}
  class={className}
  alt={post.data.title}
  {...post.data.thumbnail.attributes} />
