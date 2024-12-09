<script>
  import anime from "animejs";

  import Thumbnail from "./Thumbnail.svelte";

  let { post, children } = $props();

  let thumbnail, day, month, year;

  const date = {
    day: post.data.date.getDate(),
    month: post.data.date.getMonth() + 1,
    year: post.data.date.getFullYear(),
  };

  $effect(() => {
    anime({
      targets: thumbnail,
      scale: [0, 1],
      delay: 250,
    });

    anime({
      targets: date,
      day: [1, date.day],
      month: [1, date.month],
      year: [2000, date.year],
      easing: "linear",
      round: 1,
      update: () => {
        day.innerHTML = ("00" + date.day).slice(-2);
        month.innerHTML = ("00" + date.month).slice(-2);
        year.innerHTML = date.year;
      },
    });
  });
</script>

<div class="p-6">
  <div class="prose mx-auto">
    <h1>{post.data.description}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-5 gap-4 my-8">
      <div
        bind:this={thumbnail}
        class="sm:col-span-3"
        style="transform: scale(0)">
        <Thumbnail
          {post}
          sizes="(min-width: 640px) 375px, 90vw"
          class="rounded-box m-0" />
      </div>

      <div
        class="flex justify-center items-center text-2xl font-bold sm:col-span-2">
        <div bind:this={day}>01</div>
        .
        <div bind:this={month}>01</div>
        .
        <div bind:this={year}>2000</div>
      </div>
    </div>

    {@render children()}
  </div>
</div>
