---
date: 2023-10-07
title: Адаптивные изображения в Astro 3
description: Создание адаптивных изображений в Astro 3
excerpt: В Astro до версии 3 можно было подключить официальный плагин, который позволял создавать адаптивные изображения «из коробки». Но, начиная с версии Astro 3, этот плагин считается устаревшим, а интеграция с ним невозможна. Компоненты и функции для работы с изображениями теперь включены непосредственно в ядро Astro, но создание адаптивных изображений пока не поддерживается...
---

## Для чего нужны адаптивные изображения

Если сайт просматривается на мобильном устройстве и изображения на странице высокого разрешения, а, следовательно, и большого размера, то они будут выглядеть хорошо, но загрузка сайта через мобильную сеть может быть очень медленной. С другой стороны, если на сайте будут размещены изображения низкого разрешения и небольшого размера, то на мобильных устройствах они будут загружаться быстро, но на мониторах с высоким разрешением эти изображения будут выглядеть размыто.

Адаптивные изображения - это набор методов, используемых для загрузки изображений подходящего размера, в зависимости от разрешения устройства, ориентации, размера экрана, сетевого подключения и макета страницы. Браузер не должен растягивать изображение, чтобы оно соответствовало макету страницы, а загрузка изображения не должна приводить к потере времени и трафика. Это улучшает взаимодействие с посетителями сайта, поскольку изображения загружаются быстро и выглядят чёткими на любом устройстве.

## Адаптивные изображения в Astro

В Astro до версии 3 можно было подключить официальный плагин `@astrojs/image`, который позволял создавать адаптивные изображения «из коробки». Но, начиная с версии Astro 3, этот плагин считается устаревшим, а интеграция с ним невозможна.

Компоненты и функции для работы с изображениями теперь включены непосредственно в ядро Astro `astro:assets`, но создание адаптивных изображений пока не поддерживается, во всяком случае, на момент написания этой статьи.

> **Обновлено**: Начиная с версии Astro 3.3 поддержка адаптивных изображений была включена в `astro:assets`, поэтому это решение можно считать неактуальным.

## Решение

Создаём собственный компонент `<Image />` с поддержкой адаптивных изображений:

```js
// src/components/Image.astro
---
import { getImage } from "astro:assets";

const {
  src,
  widths = [400, 600, 800, 1000, 1200],
  loading = "lazy",
  decoding = "async",
  ...attrs
} = Astro.props;

const jpeg = await getImage({
  src: src,
  width: widths[widths.length - 1],
  format: "jpeg"
});

const webps = await Promise.all(
  widths.map((width) => getImage({ src: src, width: width })),
);

let srcset = "";
webps.forEach((webp) => {
  if (srcset) srcset += ", ";
  srcset += webp.src + " " + webp.attributes.width + "w";
});
attrs.srcset = srcset;
---

<img
  src={jpeg.src}
  width={jpeg.attributes.width}
  height={jpeg.attributes.height}
  loading={loading}
  decoding={decoding}
  {...attrs}
/>
```

Теперь этот компонент можно использовать для создания адаптивного изображения в любом шаблоне Astro:

```js
// src/pages/page.astro
---
import Image from "../components/Image.astro";
---

<Image
  src={import("../assets/image.jpg")}
  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 60vw"
  class="..."
  alt="..."
/>
```

В результате мы получим примерно такой HTML-код адаптивного изображения:

```html
<img
  src="/_astro/image.6455ce16_ZyNNt9.jpeg"
  width="1200"
  height="813"
  loading="lazy"
  decoding="async"
  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 60vw"
  class="..."
  alt="..."
  srcset="
    /_astro/image.6455ce16_Z1iQXLj.webp  400w,
    /_astro/image.6455ce16_Vta57.webp    600w,
    /_astro/image.6455ce16_1jXpBw.webp   800w,
    /_astro/image.7566di27_Y02kzN.webp  1000w,
    /_astro/image.6455ce16_Z91ryH.webp  1200w
  "
/>
```

При необходимости, можно указать любые дополнительные атрибуты изображения. Например, если изображение расположено в верхней части страницы, то его загрузку необходимо выполнить без задержек:

```js
<Image
  src={import("../assets/image.jpg")}
  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 60vw"
  class="..."
  alt="..."
  loading="eager"
/>
```
