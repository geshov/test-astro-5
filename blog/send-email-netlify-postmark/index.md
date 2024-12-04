---
date: 2023-08-05
title: Отправка Email c сайта на Netlify через Postmark
description: Отправка Email-сообщений c сайта на хостинге Netlify при помощи сервиса Postmark
excerpt: Хостинг Netlify выгодно отличается от конкурентов встроенной возможностью обработки форм, размещённых на сайте, и отправкой Email-сообщений из формы на любой адрес или несколько адресов. Но что делать, если Email-сообщения необходимо отправлять не из формы, а по другому событию...
---

Хостинг Netlify выгодно отличается от конкурентов встроенной возможностью обработки форм, размещённых на сайте, и отправкой Email-сообщений из формы на любой адрес или несколько адресов. Причём, на бесплатном тарифе можно отправлять до 100 сообщений в месяц. Но что делать, если Email-сообщения необходимо отправлять не из формы, а по другому событию? Для этого Netlify предлагает готовую интеграцию с тремя популярными сервисами отправки Email-сообщений:

- [Postmark](https://postmarkapp.com/)
- [SendGrid](https://sendgrid.com/)
- [Mailgun](https://www.mailgun.com/)

Далее я покажу как настроить отправку Email-сообщений с сайта, размещённого на хостинге Netlify, при помощи сервиса [Postmark](https://postmarkapp.com/), который позволяет отправлять до 100 сообщений в месяц бесплатно:

1. Регистрируемся на сервисе [Postmark](https://postmarkapp.com/). При этом, нужно быть готовым к следующим ограничениям:

   1.1. Сервис [Postmark](https://postmarkapp.com/) не позволяет зарегистрироваться с использованием Email-адреса общего пользования, таким как @gmail.com, @mail.ru, @yandex.ru и т.п. Для регистрации нужно воспользоваться Email-адресом в своём или корпоративном домене.

   1.2. После регистрации необходимо дождаться подтверждения аккаунта, которое, по соображениям безопасности, делается вручную сотрудниками сервиса [Postmark](https://postmarkapp.com/). Ожидание подтверждения аккаунта может продлиться до 24 часов в рабочие дни или более на выходных.

2. После подтверждения аккаунта [Postmark](https://postmarkapp.com/) необходимо выполнить ещё некоторые настройки:

   2.1. Если для отправки Email-сообщений используется личный домен или домен, для которого есть возможность редактирования DNS-записей, то желательно добавить две DNS-записи, как показано на скриншоте, чтобы можно было отправлять Email-сообщения с любого адреса в домене:

![Настройка DNS](/images/posts/send-email-netlify-postmark/img1.webp)

2.2. Если для отправки Email-сообщений используется корпоративный домен, для которого нет возможности редактирования DNS-записей, то оправлять Email-сообщения можно будет только с подтверждённых адресов:

![Подтвержденные адреса](/images/posts/send-email-netlify-postmark/img2.webp)

3. После выполнения всех необходимых настроек переходим в свойства почтового сервера и копируем «Server API Token», который понадобится для настройки интеграции с хостингом Netlify:

![API Token](/images/posts/send-email-netlify-postmark/img3.webp)

4. Далее переходим на хостинг Netlify и в настройках сайта включаем Email-интеграцию:

![Активация Email](/images/posts/send-email-netlify-postmark/img4.webp)

5. В настройках Email-интеграции выбираем поставщика [Postmark](https://postmarkapp.com/) и в поле «Email Provider APY Key» вставляем скопированный ранее «Server API Token». Остальные настройки Email-интеграции оставляем без изменений:

![Интеграция Email](/images/posts/send-email-netlify-postmark/img5.webp)

6. В настройках пользователя Netlify создаём и сохраняем в надёжном месте «Personal Access Token», который понадобится позже для загрузки сайта на хостинг из командной строки:

![Access Token](/images/posts/send-email-netlify-postmark/img6.webp)

7. Далее переходим в папку проекта и устанавливаем библиотеку Netlify для работы с Email-интеграцией:

```bash
# terminal
npm i @netlify/emails
```

8. Кроме того, потребуется библиотека Netlify для работы с функциями:

```bash
# terminal
npm i @netlify/functions
```

9. Для возможности сборки и загрузки сайта на хостинг Netlify из командной строки устанавливаем библиотеку Netlify CLI:

```bash
# terminal
npm i netlify-cli
```

10. В корне проекта создаём файл `netlify.toml`:

```js
// netlify.toml
[functions];
node_bundler = "esbuild";
```

11. В корне проекта создаём папку `emails`, которая была указана в поле «Emails directory» в настройках Email-интеграции Netlify по умолчанию. В этой папке можно создать несколько шаблонов для исходящих Email-сообщений. Для каждого шаблона создаётся отдельная подпапка с файлом `index.html` внутри. Название подпапки является названием шаблона. В данном примере шаблон будет иметь наименование `notice`:

```html
<!-- emails/notice/index.html -->
<html>
  <body>
    <p>Hello, {{name}}!</p>
  </body>
</html>
```

12. В корне проекта создаём папку `netlify`, а в ней подпапку `functions`, которая будет содержать функции Netlify. Для отправки Email-сообщений создаём файл `notify.ts`:

```ts
// netlify/functions/notify/notify.ts
import { sendEmail } from "@netlify/emails";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  await sendEmail({
    from: "name@domain.ru",
    to: "name@gmail.com",
    subject: "Subject",
    template: "notice",
    parameters: {
      name: "World",
    },
  });
  return { statusCode: 200 };
};
export { handler };
```

13. Собираем проект:

```bash
# terminal
npm run build
```

14. Загружаем сайт на хостинг из командной строки:

```bash
# terminal
npx netlify deploy --auth ACCESS_TOKEN --site SITE_ID --dir BUILD_DIR --prod --build
```

В этой команде необходимо заменить `ACCESS_TOKEN`, `SITE_ID` и `BUILD_DIR` на свои значения. Создание «Personal Access Token» показано в п.6 выше, «Site ID» можно найти в настройках сайта на Netlify, а название папки финальной сборки сайта зависит от используемого генератора и его настроек.

15. Если все было сделано правильно, то отправить Email-сообщение можно обратившись по адресу функции:

```js
// script.js
fetch("/.netlify/functions/notify").then((response) =>
  console.log(response.status)
);
```
