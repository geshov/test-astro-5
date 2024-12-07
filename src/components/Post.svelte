<script>
  import anime from "animejs";
  import Thumbnail from "./Thumbnail.svelte";

  let { post, children } = $props();

  let day, month, year;

  const date = {
    day: post.data.date.getDate(),
    month: post.data.date.getMonth() + 1,
    year: post.data.date.getFullYear(),
  };

  $effect(() => {
    anime({
      targets: date,
      day: [0, date.day],
      month: [0, date.month],
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

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
      <div>
        <Thumbnail
          id={post.id}
          sizes="(min-width: 640px) 310px, 90vw"
          alt={post.data.title} />
      </div>

      <div class="flex justify-center items-center text-2xl font-bold">
        <div bind:this={day}></div>
        .
        <div bind:this={month}></div>
        .
        <div bind:this={year}></div>
      </div>
    </div>

    {@render children()}
  </div>
</div>
