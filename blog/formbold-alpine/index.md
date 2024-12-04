---
date: 2024-01-22
title: Подключение FormBold с помощью Alpine.js
description: Подключение сервиса обработки форм FormBold с помощью фреймворка Alpine.js
excerpt: В настоящее время есть множество сервисов обработки форм, предлагающих, в том числе, бесплатный тариф с ограниченным функционалом. Сервис FormBold выделяется, среди конкурентов, довольно щедрым бесплатным тарифом – 5 форм, 100 сообщений в месяц, 2 целевых Email-адреса, на которые будут направляться сообщения из форм...
---

В настоящее время есть множество сервисов обработки форм, предлагающих, в том числе, бесплатный тариф с ограниченным функционалом. Сервис [FormBold](https://formbold.com/) выделяется, среди конкурентов, довольно щедрым бесплатным тарифом – 5 форм, 100 сообщений в месяц, 2 целевых Email-адреса, на которые будут направляться сообщения из форм.

Рассмотрим пример подключения сервиса [FormBold](https://formbold.com/) с помощью быстрого и лёгкого реактивного фреймворка [Alpine.js](https://alpinejs.dev/).

## Регистрация в FormBold и получение Endpoint

Для начала необходимо зарегистрироваться на сайте [FormBold](https://formbold.com/). Процесс регистрации тривиален, поэтому я не буду его описывать. После успешной регистрации создаём форму и получаем уникальный `endpoint` формы в таком виде:

```
https://formbold.com/s/XXXXX
```

## Установка фреймворка Alpine.js

В корне проекта выполняем команду:

```bash
# terminal
npm install alpinejs
```

## Создание формы

Пример простейшей формы:

```html
<!-- feedback.html -->
<form
  x-data="feedback"
  @submit.prevent="handleSubmit"
  :class="formValidate"
  novalidate>
  <input type="text" name="name" placeholder="Ваше имя" required />
  <input type="email" name="email" placeholder="Ваш Email" required />
  <input type="text" name="subject" placeholder="Тема" required />
  <textarea name="message" placeholder="Сообщение" required></textarea>
  <button
    type="submit"
    :disabled="submitButtonDisable"
    x-text="submitButtonText"></button>
</form>

<script src="alpine.js"></script>
```

Пояснения:

- атрибут `x-data` создаёт компонент `Alpine.js` с наименованием `feedback`;
- атрибут `@submit.prevent` вызывает обработчик формы `handleSubmit`, который рассмотрен далее в этой статье, и одновременно блокирует поведение формы по умолчанию `preventDefault()`;
- атрибут `:class` вызывает геттер `formValidate`, который, при нажатии на кнопку «Отправить», добавляет к форме класс `validate`, необходимый для валидации полей `required` с помощью своих сообщений и стилей, подробнее [здесь](/posts/tailwind-form-validation/);
- атрибут `novalidate` предотвращает валидацию полей `required` браузером.

Последние два атрибута можно опустить, если вы полагаетесь на валидацию полей браузером.

## Основной скрипт

```js
// alpine.js
import Alpine from "alpinejs";
window.Alpine = Alpine;

import feedback from "./feedback";
Alpine.data("feedback", feedback);

Alpine.start();
```

Скрипт обработки формы `feedback.js` вынесен в отдельный js-файл потому, что основной скрипт `alpine.js` может объединять в себе и другие обработчики, которые можно импортировать и подключить аналогично.

## Скрипт обработки формы

Полученный ранее `endpoint` формы указываем в качестве значения свойства `action`:

```js
// feedback.js
export default function () {
  return {
    status: "init",
    action: "https://formbold.com/s/XXXXX",

    handleSubmit() {
      const form = this.$root;
      this.status = "validate";

      if (form.checkValidity()) {
        this.status = "sending";

        const formdata = new FormData(form);
        const body = JSON.stringify(Object.fromEntries(formdata.entries()));

        fetch(this.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: body,
        })
          .then(() => {
            this.status = "sent";
            setTimeout(() => (this.status = "init"), 5000);
            form.reset();
          })
          .catch((error) => {
            this.status = "error";
            setTimeout(() => (this.status = "init"), 10000);
            console.log(error);
          });
      }
    },

    get formValidate() {
      switch (this.status) {
        case "validate":
          return this.status;
        default:
          return "";
      }
    },

    get submitButtonText() {
      switch (this.status) {
        case "sending":
          return "Отправляется";
        case "sent":
          return "Отправлено";
        case "error":
          return "Ошибка";
        default:
          return "Отправить";
      }
    },

    get submitButtonDisable() {
      switch (this.status) {
        case "sending":
          return true;
        case "sent":
          return true;
        case "error":
          return true;
        default:
          return false;
      }
    },
  };
}
```

Таким образом, форма будет поочерёдно получать один из статусов:

- `init` – форма в процессе ожидания отправки;
- `validate` – нажата кнопка «Отправить», но валидация ещё не подтверждена;
- `sending` – валидация подтверждена и начался процес отправки;
- `sent` – сообщение успешно отправлено;
- `error` – ошибка при отправке сообщения (текст ошибки записывается в консоль).

Кнопка «Отправить» отражает текущий статус формы и будет недоступна для нажатия во время отправки сообщения.

Рабочий пример этого решения можно посмотреть на странице [Контакты](/contact/).
