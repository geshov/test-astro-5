---
date: 2022-11-25
title: Tailwind CSS в 11ty
description: Подключение Tailwind CSS к проекту на Eleventy
excerpt: Tailwind CSS работает, сканируя все ваши HTML-файлы, компоненты JavaScript и любые другие шаблоны на предмет имён классов, генерируя соответствующие стили и затем записывая их в статический CSS-файл. Это означает, что в конечный CSS-файл попадают не все стили Tailwind, а только те, которые были задействованы в процессе вёрстки. Это минимизирует объем загружаемых данных при открытии сайта и благоприятно влияет на его SEO-оптимизацию...
---

Цитата из документации **Tailwind CSS**:

> Tailwind CSS работает, сканируя все ваши HTML-файлы, компоненты JavaScript и любые другие шаблоны на предмет имён классов, генерируя соответствующие стили и затем записывая их в статический CSS-файл.

Это означает, что в конечный CSS-файл попадают не все стили **Tailwind**, а только те, которые были задействованы в процессе вёрстки. Это минимизирует объем загружаемых данных при открытии сайта и благоприятно влияет на его SEO-оптимизацию.

Но для того, чтобы **Eleventy** корректно работал в паре с **Tailwind CSS** нужно выполнить некоторые настройки, о чем и пойдёт речь в этой инструкции.

Первым делом устанавливаем **Tailwind CSS** в проект **Eleventy**, выполнив команду из корня проекта:

```bash
# terminal
npm install -D tailwindcss
```

Следующей командой создаём конфигурационный файл `tailwind.config.js`:

```bash
# terminal
npx tailwindcss init
```

Указываем обработчику **Tailwind CSS** путь к шаблонам **Eleventy** для их сканирования в процессе сборки и создания конечного CSS-файла на их основе:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

При этом, путь к исходникам проекта в конфигурационном файле **Eleventy** должен быть соответствующим:

```js
// .eleventy.js
module.exports = (config) => {
  ...
  return {
    dir: {
      input: "src",
    },
  };
};

```

Создаём исходный файл **Tailwind CSS** с наименованием `input.css` в папке `src/_includes/tailwind` со следующим содержимым:

```css
/* src/_includes/tailwind/input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Далее, в процессе разработки, нужно будет **последовательно** запускать сборщик **Tailwind CSS**, а затем сборщик **Eleventy** для сборки всего сайта. А для отслеживания изменений в исходниках, во время работы локального сервера, эти два процесса должны работать **параллельно**.

Для организации **последовательного** и **параллельного** запуска сборщиков **Tailwind CSS** и **Eleventy** устанавливаем пакет `npm-run-all` из корня проекта:

```bash
# terminal
npm install -D npm-run-all
```

В проект добавляем скрипты для сборки сайта и запуска локального сервера, используя команды `run-s` и `run-p` пакета `npm-run-all`:

```json
// package.json
{
  "scripts": {
    "build": "run-s build-css build-11ty",
    "start": "run-p start-css start-11ty",
    "build-css": "tailwindcss -i src/_includes/tailwind/input.css -o src/_includes/tailwind/output.css --minify",
    "build-11ty": "eleventy",
    "start-css": "tailwindcss -i src/_includes/tailwind/input.css -o src/_includes/tailwind/output.css --watch",
    "start-11ty": "eleventy --serve"
  },
  "devDependencies": {
    "@11ty/eleventy": "^1.0.2",
    "npm-run-all": "^4.1.5",
    "tailwindcss": "^3.2.4"
  }
}
```

Теперь для сборки всего сайта достаточно выполнить команду:

```bash
# terminal
npm run build
```

А для запуска локального сервера с отслеживанием изменений в исходниках - команду:

```bash
# terminal
npm run start
```

**Tailwind CSS**, в процессе сканирования шаблонов сайта, будет формировать файл со стилями `output.css`, который можно включить в базовый шаблон сайта следующим образом:

```js
// base.njk
<head>
  ...
  {%- set css %}
  {% include "tailwind/output.css" %}
  {%- endset %}
  <style>
    {{ css | safe }}
  </style>
  ...
</head>
```

Для того, чтобы, во время работы локального сервера, сборщик **Eleventy** запускался всегда только после сборщика **Tailwind CSS** (когда они работают параллельно), в конфигурацию **Eleventy** добавляем небольшую паузу перед запуском сборщика **Eleventy**:

```js
// .eleventy.js
module.exports = (config) => {
  ...
  config.setWatchThrottleWaitTime(1000);
  ...
};
```
