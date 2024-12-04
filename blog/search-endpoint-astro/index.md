---
date: 2022-12-31
title: Endpoint для поиска в Astro
description: Создание Endpoint в формате JSON для реализации поиска по сайту в Astro
excerpt: Для реализации поиска по сайту, созданному на стеке Jamstack, можно воспользоваться популярной библиотекой List.js. У библиотеки неплохая документация на официальном сайте. Тем не менее, в зависимости от выбранной парадигмы, библиотеке может потребоваться доступ к структурированным данными постов сайта...
---

Для реализации поиска по сайту, созданному на стеке **Jamstack**, можно воспользоваться популярной библиотекой **List.js**. У библиотеки неплохая документация на [официальном сайте](https://listjs.com/). Тем не менее, в зависимости от выбранной парадигмы, библиотеке может потребоваться доступ к структурированным данными постов сайта. В этой инструкции я покажу пример создания такого объекта при разработке сайта на **Astro**.

Для этого воспользуемся, встроенной в **Astro**, возможностью создания **Endpoints** любого формата. В папке `pages` создаём файл `posts.json.js` со следующим содержимым:

```js
// src/pages/posts.json.js
import { getCollection } from "astro:content";
const posts = await getCollection("posts");

const json = posts.map((post) => ({
  date: post.data.date,
  title: post.data.title,
  description: post.data.description,
  body: post.body,
  url: `/posts/${post.slug}/`,
}));

export function GET() {
  return new Response(JSON.stringify(json));
}
```

Теперь, в процессе сборки сайта, дополнительно будет генерироваться **Endpoint** в формате `JSON` с данными из всех постов сайта, размещённых в формате **Markdown**.

При создании **Endpoints** в **Astro** расширение `js` отбрасывается, поэтому результирующий файл получит наименование `posts.json` и, на примере этого сайта, будет доступен по адресу https://geshov.ru/posts.json.

Полученный `JSON` с данными постов сайта можно использовать для реализации поиска по сайту при помощи библиотеки **List.js**:

```bash
# terminal
npm i list.js
```

```html
<!-- src/pages/search.astro -->
<div id="posts">
  <input class="search" placeholder="Поиск" />
  <ul class="list"></ul>
</div>

<script>
  import List from "list.js";
  fetch("/posts.json")
    .then((response) => response.json())
    .then((json) => {
      const options = {
        valueNames: ["date", "title", "description", "body"],
        searchColumns: ["title", "description", "body"],
        item: (item) => `<li>
          <a href="${item.url}" class="title">${item.title}</a>
          <div class="date">${item.date}</div>
          <div class="description">${item.description}</div>
        </li>`,
        page: 10,
      };
      const list = new List("posts", options, json);
    });
</script>
```
