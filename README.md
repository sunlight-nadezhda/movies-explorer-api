# Бэкенд для movies-explorer-api

Бэкенд для сервиса, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

Создала инфраструктуру, схемы и модели ресурсов.  
Написала роуты и контроллеры.  
Сделала аутентификацию и авторизацию.  
Реализовала логирование.

## API проекта movies-explorer

возвращает информацию о пользователе (email и имя)
```
GET /users/me
```

обновляет информацию о пользователе (email и имя)
```
PATCH /users/me
```

возвращает все сохранённые пользователем фильмы
```
GET /movies
```

создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
```
POST /movies
```

удаляет сохранённый фильм по id
```
DELETE /movies/movieId
```

## Команды для работы с проектом

`npm install` чтобы установить зависимости

`npm run lint` для запуска eslint

`npm run start` для запуска сервера в режиме production

`npm run dev` для запуска сервера в режиме development

<!-- публичный IP-адрес сервера: 178.154.228.70
backend: api.movies-explorer.sun.nomoredomains.monster -->
