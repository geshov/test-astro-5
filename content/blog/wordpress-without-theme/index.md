---
date: 2023-03-31
title: Быстрый сайт на Wordpress
description: Быстрый сайт на Wordpress без использования темы и плагинов
excerpt: Существует распространённое мнение о том, что Wordpress не может похвастаться высоким быстродействием. Действительно, Wordpress по таким показателям, как скорость открытия страниц и защищённость не может конкурировать с сайтами, созданными на Jamstack. Однако, не все так безнадёжно, как многие пытаются это представить...
---

Существует распространённое мнение о том, что Wordpress не может похвастаться высоким быстродействием. Действительно, Wordpress по таким показателям, как скорость открытия страниц и защищённость не может конкурировать с сайтами, созданными на Jamstack. Однако, не все так безнадёжно, как многие пытаются это представить.

Суждение о Wordpress, как о тяжёлой и неповоротливой платформе, является в корне ошибочным. Такую картину могут тиражировать только те, кто очень поверхностно знаком с Wordpress, либо те, кто просто повторяет чужое мнение.

> Но почему у Wordpress такая репутация?

Все верно - "дыма без огня не бывает", далее я постараюсь доступно объяснить причину возникновения такого суждения и предложу способ, который сам использую, чтобы сделать сайт на Wordpress очень быстрым.

Разработчики Wordpress с самого начала позиционировали эту систему, как простой инструмент для создания сайтов и блогов обычными пользователями, без привлечения квалифицированных программистов, дизайнеров и верстальщиков.

Идея заключалась в том, что пользователь, после установки Wordpress и подключения выбранной темы (дизайна), сразу же может приступить к наполнению своего сайта контентом (информацией) и опубликовать его. Это выглядит очень привлекательно, но здесь и кроется подвох, который, в конечном итоге, делает сайты на Wordpress такими тяжёлыми и неповоротливыми.

Чтобы понять почему так происходит, разберём сайт, сделанный на Wordpress, на составные части:

1. **Платформа Wordpress** - библиотека на языке программирования PHP для работы с базой данных, предназначенная для создания, редактирования, удаления, поиска, выборки, сортировки постов и страниц сайта, а также предоставляющая другой базовый функционал, которым пользователь не может воспользоваться напрямую.

2. **Консоль Wordpress** - административная панель, позволяющая пользователю интерактивно создавать и редактировать посты и страницы сайта, а также подключать Тему и Плагины.

3. **Тема** - подготовленная программистами и дизайнерами надстройка над платформой Wordpress, позволяющая публиковать записи и страницы сайта в соответствующем дизайне, а также изменять настройки сайта.

4. **Плагины** - программные модули, предназначенные для добавления на сайт возможностей, не предусмотренных Темой.

5. **Контент** - текст, фото и видео, которые добавляет пользователь на сайт для публикации.

Пользователи, начинающие создавать сайт на Wordpress, считают, что Тема - это просто дизайн будущего сайта. И это очень коварное заблуждение. Тема - это не только и не столько дизайн сайта, сколько программный код, который формирует функционал сайта и предоставляет пользователю возможность быстро его опубликовать, не обладая специальной квалификацией.

Это заблуждение приводит к тому, что выбранная некачественная Тема становится причиной всех проблем, с которыми в результате сталкивается владелец сайта. При этом, сама **платформа Wordpress работает очень быстро и без нареканий**.

Вот две основные причины, по которым большинство тем Wordpress нельзя считать качественными:

1. В подавляющем большинстве, Темы для Wordpress создаются не программистами, а дизайнерами. А те задачи, которые требуется решить в Теме с помощью программирования, решаются путём поиска готового кода в Интернете, который, чаще всего, оказывается не очень качественным, либо с помощью привлечения сторонних (open-source) программистов, не вовлечённых в рабочий процесс и смутно понимающих конечные цели.

2. Создатели Темы обычно пытаются сделать продукт, который можно будет продать как можно большему количеству пользователей. Для этого они включают в тему множество различных возможностей и настроек, которые далеко не всем нужны. Зачастую добавление новых возможностей растянуто по времени, делается разными (open-source) программистами, новый код начинает конфликтовать со старым, что требует его адаптации, ещё больше захламляя Тему и замедляя сайт, созданный с её использованием.

При выборе, пользователь отдаёт предпочтение Темам, которые предлагают больше возможностей, не понимая, что это не преимущество, а недостаток. Такие Темы содержат в себе тонны ненужного кода, который будет загружаться в память при обращении к сайту и замедлять его работу, а также сотни ошибок, которые разработчики исправляют годами, выпуская новые версии Темы.

При этом, владелец сайта, после очередного обновления Темы до новой версии, может обнаружить, что его сайт выглядит и работает совсем не так, как раньше, если в Тему, помимо исправления ошибок, были добавлены очередные новые возможности и, связанные с ними, ошибки.

Сложившееся положение усугубляет использование Плагинов. Неопытные разработчики, вместо того, чтобы решить какую-либо задачу при помощи нескольких строк кода на PHP и/или JavaScript, необдуманно подключают к сайту очередной Плагин. В итоге на сайт устанавливаются десятки Плагинов, каждый из которых несёт избыточный функционал и создаёт немалую дополнительную нагрузку.

> А есть ли выход из сложившейся ситуации?

Выход есть и он указан в заголовке этой статьи. Для создания быстрого и надёжного сайта на Wordpress рекомендую привлечь грамотного программиста на PHP и JavaScript, имеющего опыт работы с Wordpress на низком уровне, без подключения Темы. Кроме того, на сайт должны быть установлены только самые необходимые Плагины (защита, оптимизация), не оказывающие влияние на формирование страниц и производительность.
