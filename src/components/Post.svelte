<script>
  import Thumbnail from "./Thumbnail.svelte";

  let { post, children } = $props();

  let dayEl, monthEl, yearEl;

  const { day, month, year } = (() => {
    const date = post.data.date.toLocaleDateString("ru-RU").split(".");
    const day = date.at(0);
    const month = date.at(1);
    const year = date.at(2);
    return { day, month, year };
  })();
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

      <div class="flex justify-center items-center text-2xl font-bold">
        <div bind:this={dayEl}>{day}</div>
        .
        <div bind:this={monthEl}>{month}</div>
        .
        <div bind:this={yearEl}>{year}</div>
      </div>
    </div>

    {@render children()}
  </div>
</div>
