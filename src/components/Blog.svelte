<script>
  import Image from "./Image.svelte";

  let { blog } = $props();
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>Блог</h1>

    <div class="space-y-8">
      {#each blog as post}
        <a href="/posts/{post.id}" class="flex gap-4 no-underline">
          <div class="w-1/3 aspect-[2000/1333] shrink-0">
            <Image
              id={post.id}
              sizes="(min-width: 635px) 212px, 30vw"
              alt={post.data.title} />
          </div>

          <div class="space-y-2">
            <div class="text-xs text-info">
              {post.data.date.toLocaleDateString("ru-RU")}
            </div>

            <div class="link link-primary">
              {post.data.description}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
