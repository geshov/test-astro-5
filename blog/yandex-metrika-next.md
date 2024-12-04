---
date: 2023-11-25
title: Яндекс Метрика для Next.js
description: Подключение счётчика Яндекс Метрики к проекту Next.js
excerpt: Пример правильного подключения счётчика Яндекс Метрики к проекту Next.js (App Router). Решение основано на официальной документации Яндекс...
---

Пример правильного подключения счётчика Яндекс Метрики к проекту Next.js (App Router). Решение основано на [официальной документации Яндекс](https://yandex.ru/support/metrica/code/counter-spa-setup.html).

## Создание компонента счётчика

Создаём компонент `Metrika` со счётчиком Яндекс Метрики:

```js
// app/components/metrika.js
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export function Metrika() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ym(XXXXXXXX, "hit", window.location.href);
  }, [pathName, searchParams]);

  return (
    <Script id="yandex-metrika">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(XXXXXXXX, "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
        });    
      `}
    </Script>
  );
}
```

Код счётчика может отличаться в зависимости от различных параметров настройки Яндекс Метрики. Поэтому его необходимо скопировать из настроек Яндекс Метрики сайта и вставить в компонент `Script`, используя обратные кавычки, как показано в примере выше. После чего, к функции инициализации счётчика `ym(..., "init", ...)` нужно добавить параметр `defer: true`. В примере выше это уже сделано.

## Подключение компонента счётчика

Подготовленный компонент `Metrika` вставляем в корневой макет сайта, обернув его в React-компонент `Suspense`:

```js
// app/layout.js
import { Suspense } from "react";
import { Metrika } from "@/app/components/metrika";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <main>{children}</main>
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  );
}
```

Таким образом, счётчик Яндекс Метрики будет вызываться при переходе на любую страницу сайта, при изменении параметров URL и при переходе вперёд/назад в браузере.

## Отслеживание достижения цели

Для отслеживания событий на сайте, при которых URL страницы не меняется, необходимо использовать функцию `reachGoal`:

```js
ym(XXXXXXXX, "reachGoal", "TARGET_NAME");
```

Пример установки счётчика достижения цели на кнопку:

```js
<button
  type="button"
  onclick="ym(XXXXXXXX, 'reachGoal', 'TARGET_NAME'); return true;">
  Заказать
</button>
```

С другими примерами можно ознакомиться по [ссылке](https://yandex.ru/support/metrica/objects/reachgoal.html).
