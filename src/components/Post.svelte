<script>
  import anime from "animejs";

  let { post, children, thumbnail } = $props();

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

    <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
      <div class="sm:col-span-3">
        {@render thumbnail()}
      </div>

      <div
        class="flex justify-center items-center text-2xl font-bold sm:col-span-2">
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
