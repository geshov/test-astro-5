---
date: 2022-12-28
title: Cycler в шаблонах Astro
description: Реализация функции Cycler из Nunjucks в шаблонах Astro
excerpt: В шаблонизаторе Nunjucks имеется очень полезная функция - Cycler. При вёрстке сайта на Astro мне очень недоставало этой функции в шаблонах .astro. Но Astro тем и хорош, что позволяет, без особых усилий, самостоятельно добавить в шаблонизатор любую недостающую функцию...
---

В шаблонизаторе **Nunjucks** имеется очень полезная функция - `Cycler`. Вот фрагмент из документации **Nunjucks**:

> An easy way to rotate through several values is to use `Cycler`, which takes any number of arguments and cycles through them.

```js
// page.njk
{% set cls = cycler("odd", "even") %}
{% for row in rows %}
  <div class="{{ cls.next() }}">{{ row.name }}</div>
{% endfor %}
```

В этом примере нечётные строки получают класс `odd`, а чётные строки - класс `even`.

При вёрстке сайта на **Astro** мне очень недоставало этой функции в шаблонах `.astro`. Но **Astro** тем и хорош, что позволяет, без особых усилий, самостоятельно добавить в шаблонизатор любую недостающую функцию.

В папке `src` создаём подпапку `utils`, в которой создаём файл `helpers.js`:

```js
// src/utils/helpers.js
export class Cycler {
  constructor(array) {
    this.current = 0;
    this.array = array;
  }
  next = () => {
    if (this.current > this.array.length - 1) this.current = 0;
    return this.array[this.current++];
  };
}
```

Здесь мы экспортируем класс `Cycler`. Объект класса `Cycler`, при инициализации, принимает массив значений в качестве параметра. Далее, метод `next()` каждый раз будет возвращать следующее значение массива, циклически возвращаясь в начало массива при его окончании.

Теперь, в любом шаблоне **Astro**, можно задействовать `Cycler` следующим образом:

```js
// page.astro
---
import { Cycler } from "../utils/helpers";
const cls = new Cycler(["odd", "even"]);
---
{rows.map((row) => (
  <div class={cls.next()}>{row.name}</div>
))}
```
