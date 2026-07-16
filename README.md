# Сайт Марины Дугиной для GitHub Pages

Эта папка — готовый автономный статический сайт. Для его работы не нужны Tilda, сервер, база данных или сборка проекта.

## Публикация

1. Создайте репозиторий GitHub и загрузите в его корень **содержимое этой папки**.
2. Откройте `Settings → Pages`.
3. В разделе `Build and deployment` выберите `Deploy from a branch`.
4. Выберите ветку `main` и папку `/(root)`, затем нажмите `Save`.
5. В поле `Custom domain` укажите `marinadugina.ru`.
6. После проверки DNS включите `Enforce HTTPS`.

Файл `CNAME` уже содержит домен `marinadugina.ru`. Файл `.nojekyll` отключает обработку Jekyll.

## DNS для marinadugina.ru

Для корневого домена создайте четыре записи `A`:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Рекомендуется также создать `CNAME` для `www`, направив его на `<ВАШ_GITHUB_ЛОГИН>.github.io` без имени репозитория. GitHub будет перенаправлять `www.marinadugina.ru` на основной домен.

Не используйте wildcard-запись `*`. GitHub рекомендует заранее подтвердить домен в настройках аккаунта и сохранить выданную TXT-запись.

Официальные инструкции:

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Как работают обращения

GitHub Pages не выполняет серверный код. Поэтому сайт использует автономное контактное окно: посетитель выбирает Telegram, WhatsApp или email, а сообщение получает подходящую тему. Чек-лист открывается отдельной страницей и доступен для печати.

## Перед запуском

- Проверьте Telegram `@MarishaDugina`, WhatsApp `+7 903 417-46-79` и email `70brigantina@gmail.com`.
- Убедитесь, что счётчик Яндекс Метрики `110761930` принадлежит Марине.
- Проверьте сайт после включения HTTPS.
