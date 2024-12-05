---
date: 2023-03-28
title: Подключение Alpine.js к проекту на Astro
description: Подключение фреймворка Alpine.js и его плагинов к проекту на Astro
excerpt: Для использования фреймворка Alpine.js в проекте на Astro разработчики предусмотрели официальную интеграцию. Однако, у этого решения имеется два существенных недостатка. Чтобы обойти эти ограничения необходимо отказаться от использования официальной интеграции и подключить Alpine.js и необходимые плагины альтернативным способом...
---

Для использования фреймворка **Alpine.js** в проекте на **Astro** разработчики предусмотрели [официальную интеграцию](https://docs.astro.build/en/guides/integrations-guide/alpinejs/).

Согласно инструкции, размещённой на странице интеграции, для подключения **Alpine.js** к проекту на **Astro** достаточно выполнить следующую команду в корне проекта:

```bash
# terminal
npx astro add alpinejs
```

Действительно очень просто. Однако, у этого решения имеется два существенных недостатка.

Первый:

> Once the integration is installed, you can use Alpine.js directives and syntax inside any Astro component. The Alpine.js script is automatically added and enabled on every page of your website.

Таким образом, скрипт **Alpine.js** будет добавлен ко всем страницам сайта, даже к тем, на которых он не используется, что немного утяжелит эти страницы.

Второй:

> The Alpine.js integration does not give you control over how the script is loaded or initialized... It is not currently possible to extend Alpine.js when using this component.

А это ограничение не позволяет подключить к проекту плагины **Alpine.js**, среди которых есть очень даже полезные. Например, [плагин Persist](https://alpinejs.dev/plugins/persist) позволяет сохранять состояние данных **Alpine.js**, объявленных в атрибуте `x-data`, при переходе с одной страницы на другую и даже между сессиями.

Чтобы обойти эти ограничения необходимо отказаться от использования официальной интеграции и подключить **Alpine.js** и необходимые плагины альтернативным способом. Далее я покажу как это сделать.

1. Устанавливаем **Alpine.js** без интеграции:

```bash
# terminal
npm install alpinejs
```

2. Устанавливаем необходимые плагины:

```bash
# terminal
npm install @alpinejs/persist
```

3. Теперь, на любой странице сайта, где это необходимо, можно задействовать фреймворк **Alpine.js** и его плагины, добавив следующий код:

```html
<!-- page.astro -->
<div x-data="{...}">...</div>

<script>
  import Alpine from "alpinejs";
  import persist from "@alpinejs/persist";
  Alpine.plugin(persist);
  Alpine.start();
</script>
```

4. При необходимости более гибкого управления данными и поведением **Alpine.js**, нежели позволяют `x-атрибуты`, код будет выглядеть так:

```html
<!-- page.astro -->
<div x-data="example">...</div>

<script>
  import Alpine from "alpinejs";
  import persist from "@alpinejs/persist";
  Alpine.plugin(persist);
  document.addEventListener("alpine:init", () => {
    Alpine.data("example", function () {
      ...
    });
  });
  Alpine.start();
</script>
```
