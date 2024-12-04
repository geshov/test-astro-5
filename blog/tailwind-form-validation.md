---
date: 2023-07-08
title: Валидация формы посредством Tailwind CSS
description: Замена стандартных сообщений браузера при валидации формы посредством Tailwind CSS
excerpt: У библиотеки Tailwind CSS, на первый взгляд, нет такого решения, т.к. в документации Tailwind нет отдельного раздела, посвящённого валидации форм. Тем не менее, Tailwind позволяет красиво решить эту задачу и это решение является даже более гибким...
---

В отличии от библиотеки Bootstrap CSS, которая включает в себя [готовое решение](https://getbootstrap.com/docs/5.3/forms/validation), позволяющее переопределить стандартные сообщения браузера при валидации формы, у библиотеки Tailwind CSS, на первый взгляд, нет такого решения, т.к. в документации Tailwind нет отдельного раздела, посвящённого валидации форм, во всяком случае на момент написания этой статьи.

Тем не менее, Tailwind позволяет красиво решить эту задачу и это решение является даже более гибким.

## Решение

1. Назначаем форме уникальный идентификатор:

```html
<form id="feedback">...</form>
```

2. Добавляем к форме класс `group`:

```html
<form id="feedback" class="group">...</form>
```

3. Добавляем к форме атрибут `novalidate`:

```html
<form id="feedback" class="group" novalidate>...</form>
```

4. Добавляем к каждому полю, требующему валидации, класс `peer`:

```html
<form id="feedback" class="group" novalidate>
  ...
  <input type="email" name="email" class="peer" required />
  ...
</form>
```

5. После каждого поля, требующего валидации, добавляем пользовательскую подсказку:

```html
<form id="feedback" class="group" novalidate>
  ...
  <input type="email" name="email" class="peer" required />
  <div class="hidden group-[.validate]:peer-invalid:block">
    Укажите правильный Email-адрес
  </div>
  ...
</form>
```

Классы `hidden` и `group-...` необходимы для того, чтобы подсказка появилась только после попытки отправки формы и при неверном заполнении поля.

6. Добавляем JavaScript-обработчик формы, активирующий подсказки для неверно заполненных полей:

```html
<script type="module">
  const form = document.getElementById("feedback");
  form.addEventListener("submit", (event) => {
    form.classList.add("validate");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
</script>
```

Рабочий пример этого решения можно посмотреть на странице [Контакты](/contact/).
