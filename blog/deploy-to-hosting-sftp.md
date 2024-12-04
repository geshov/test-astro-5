---
date: 2024-07-06
title: Деплой сайта на хостинг через SFTP
description: Развёртывание сайта на хостинге в один клик
excerpt: Такие хостинговые площадки, как Vercel, Netlify и т.п., предлагают готовые CLI-решения для Node.js, позволяющие автоматизировать развёртывание сайта из командной строки. Но что делать, если сайт размещён на обычном (бюджетном) виртуальном хостинге? Ведь не очень удобно для каждой новой сборки сайта открывать FTP-клиент и загружать сайт на хостинг практически вручную...
---

Такие хостинговые площадки, как Vercel, Netlify и т.п., предлагают готовые CLI-решения для Node.js, позволяющие автоматизировать развёртывание сайта из командной строки. Но что делать, если сайт размещён на обычном (бюджетном) виртуальном хостинге? Ведь не очень удобно для каждой новой сборки сайта открывать FTP-клиент и загружать сайт на хостинг практически вручную.

Хорошая новость в том, что для такого сценария у меня тоже есть готовое решение для Node.js. Решение основано на подключении к хостингу по защищённому протоколу SFTP, который можно включить на любом хостинге.

## Решение

1. Добавляем к проекту библиотеку `ssh2-sftp-client`:

```bash
# terminal
npm i -D ssh2-sftp-client
```

2. Создаем в корне проекта файл `deploy.js` со скриптом для развёртывания:

```js
import Client from "ssh2-sftp-client";
const sftp = new Client();

sftp
  .connect({
    host: "example.com",
    port: "22",
    username: "user",
    password: "******",
  })

  .then(async () => {
    console.log("Delete old version...");
    await sftp.rmdir("/var/www/user/data/www/example.com", true);
    console.log("...done.");

    sftp.on("upload", (info) => {
      console.log(`upload: ${info.source}`);
    });

    console.log("Upload new version...");
    await sftp.uploadDir("dist", "/var/www/user/data/www/example.com");
    console.log("...done.");

    sftp.end();
  })

  .catch((err) => {
    console.log(err);
  });
```

Пояснения:

- Порт для подключения по SFTP нужно выяснить в настройках хостинга, он чаще всего отличается от стандартного `22`.
- В примере выше локальная папка с готовой сборкой сайта называется `dist`, но у различных генераторов она может называться по другому, например `build`.
- Абсолютный путь к папке сайта на хостинге `/var/.../example.com` тоже может различаться на разных хостинговых площадках.

Абсолютный путь к папке сайта можно выяснить в административной панели хостинга, либо при помощи метода `list` библиотеки `ssh2-sftp-client`:

```js
import Client from "ssh2-sftp-client";
const sftp = new Client();

sftp
  .connect({
    host: "example.com",
    port: "22",
    username: "user",
    password: "******",
  })

  .then(async () => {
    const dir = await sftp.list("/");
    // далее
    const dir = await sftp.list("/var/");
    // далее
    const dir = await sftp.list("/var/www/");
    // и т.д. пока не появится папка сайта

    console.log(dir);

    sftp.end();
  })

  .catch((err) => {
    console.log(err);
  });
```

Полная документация по API библиотеки `ssh2-sftp-client` по [ссылке](https://github.com/theophilusx/ssh2-sftp-client/blob/master/README.md).

3. После правильной настройки порта и папок можно загрузить сайт на хостинг одной командой:

```bash
# terminal
node deploy
```
