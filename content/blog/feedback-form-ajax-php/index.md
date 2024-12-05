---
date: 2023-03-25
title: Отправка формы при помощи Fetch API и PHP
description: Обработка формы обратной связи при помощи Fetch API на клиенте и PHP на сервере
excerpt: Браузер, при отправке формы, по умолчанию переходит по адресу, указанному в атрибуте action тега form, или, как минимум, вызывает перезагрузку текущей страницы. Но такое поведение не всегда соответствует требованиям. Чтобы не допустить этого необходимо переопределить стандартное поведение браузера, заменив его своим обработчиком...
---

Браузер, при отправке формы, по умолчанию переходит по адресу, указанному в атрибуте `action` тега `form`, или, как минимум, вызывает перезагрузку текущей страницы. Но такое поведение не всегда соответствует требованиям. Чтобы не допустить этого необходимо переопределить стандартное поведение браузера, заменив его своим обработчиком.

Для отправки формы обратной связи, без перезагрузки текущей страницы сайта, за основу можно взять следующий код:

```html
<!-- html -->
<form id="feedback">
  <input type="text" name="name" placeholder="Имя" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="subject" placeholder="Тема" required />
  <textarea name="message" placeholder="Сообщение" required></textarea>
  <button type="submit">Отправить</button>
</form>
<script src="feedback.js"></script>
```

```js
// feedback.js
const form = document.getElementById("feedback");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    const response = await fetch("/feedback.php", {
      method: "POST",
      body: new FormData(form),
    });
    if (response.ok) {
      // сообщение об успешной отправке формы
      console.log(await response.text());
    } else {
      // сообщение об ошибке
      console.log(response.status);
    }
  }
});
```

А это простейший PHP-код для получения данных формы на сервере с последующей отправкой Email-сообщения получателям:

```php
// feedback.php
<?php

$name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$subject = filter_var($_POST["subject"], FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_var($_POST["message"], FILTER_SANITIZE_SPECIAL_CHARS);

$to = "recipient1@example.com, recipient2@example.com";

$headers = [
  "From" => "{$name} <noreply@example.com>",
  "Reply-To" => $email,
  "Content-type" => "text/html"
];

$result = mail($to, $subject, $message, $headers);

echo $result;
```

Однако, использование PHP-функции `mail()` напрямую, как в примере выше, не рекомендуется. Вместо этого, для отправки Email-сообщений с сервера PHP, лучше воспользоваться специализированной библиотекой, например [PHPMailer](https://github.com/PHPMailer/PHPMailer).

Кроме того, необходимо позаботиться о защите формы от спама. Рекомендую для этого разработать свою систему защиты, которая не будет зависеть от сторонних сервисов и, таким образом, не будет замедлять загрузку страницы с формой. Дополнительное преимущество продуманной нестандартной защиты в том, что спам-боты не могут её преодолеть даже по прошествии нескольких лет, в отличии от распространённых решений.
