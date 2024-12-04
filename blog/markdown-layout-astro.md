---
date: 2022-12-22
title: Динамический Layout для Markdown в Astro
description: Как в Astro программно задать Layout для всех файлов Markdown в коллекции
excerpt: Для вставки статьи, написанной c помощью Markdown, в шаблон страницы сайта на Astro, в документации предлагается указать Layout в секции Frontmatter файла Markdown. Но у этого способа есть существенный недостаток - корректный Layout необходимо явно указать во всех файлах Markdown и, при этом, не ошибиться. А если таких файлов сотни или даже тысячи? Можно не прописывать Layout в каждом файле Markdown, а указать его один раз для всех файлов Markdown в коллекции...
---

Для вставки статьи, написанной c помощью **Markdown**, в шаблон страницы сайта на **Astro**, в документации предлагается указать `Layout` в секции `Frontmatter` файла **Markdown**:

```json
// post.md
---
layout: ../../layouts/Post.astro
title: Заголовок статьи
---
```

А в самом шаблоне страницы, посредством тега `slot`, необходимо указать то место, куда будет вставлен текст **Markdown** после рендеринга:

```js
// Post.astro
---
const {frontmatter} = Astro.props;
---

<html>
  ...
  <body>
    ...
    <h1>{frontmatter.title}</h1>
    <slot />
    ...
  </body>
</html>
```

Но у этого способа есть существенный недостаток - корректный `Layout` необходимо явно указать во всех файлах **Markdown** и, при этом, не ошибиться. А если таких файлов сотни или даже тысячи?

В **Netlify CMS**, при создании нового файла **Markdown**, эту процедуру можно автоматизировать, добавив скрытое поле со значением по умолчанию:

```json
// config.yml
...
collections:
  - name: "posts"
    label: "Блог"
    label_singular: "Пост"
    folder: "src/pages/posts"
    create: true
    fields:
      - { label: "Шаблон", name: "layout", widget: "hidden", default: "../../layouts/Post.astro" }
      - { label: "Заголовок", name: "title", widget: "string" }
...
```

Тем не менее, в случае изменения структуры сайта или при переносе файлов **Markdown** с другого ресурса, необходимо будет прописать новый `Layout` во всех этих файлах и это может превратиться в головную боль.

> А можно не прописывать `Layout` в каждом файле **Markdown**, а указать его один раз для всех файлов **Markdown** в коллекции (папке)?

Да, можно.

Для этого необходимо воспользоваться **динамической маршрутизацией** и в этой статье я покажу как это сделать.

Первым делом переносим все файлы **Markdown** за пределы папки `pages`, чтобы **Astro** не генерировал для них страницы со статической маршрутизацией:

```bash
# project folder
src
 ├ layouts
 │  └ ...
 ├ pages
 │  ├ posts
 │  │  └ [slug].astro
 │  └ ...
 └ posts
    ├ post.md
    ├ other.md
    └ ...
```

Внутри папки `pages`, в подпапке, где должны были располагаться файлы **Markdown**, создаём шаблон динамической маршрутизации `[slug].astro` со следующим содержимым:

```js
// [slug].astro
---
export async function getStaticPaths() {
  const posts = await Astro.glob("../../posts/*.md");
  return posts.map((post) => {
    const path = post.file.split("/");
    const slug = path[path.length - 1].split(".")[0];
    return {
      params: {
        slug: slug,
      },
      props: {
        post,
      },
    };
  });
}

const { frontmatter, Content } = Astro.props.post;
---

<html>
  ...
  <body>
    ...
    <h1>{frontmatter.title}</h1>
    <Content />
    ...
  </body>
</html>
```

Теперь, ко всей коллекции файлов **Markdown**, полученной при помощи функции `Astro.glob()`, будет применяться `Layout` динамической маршрутизации `[slug].astro`.

В этом примере переменная динамического маршрута `[slug]` заменяется на название файла **Markdown** без расширения. Но для этой цели можно использовать любое другое поле из `Frontmatter`. Например, можно создать поле `slug` для явного назначения адреса странице.
