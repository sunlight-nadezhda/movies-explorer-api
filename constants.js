const errorMessages = {
  total: 'На сервере произошла ошибка',
  needAuth: 'Необходима авторизация',
  invalidUserId: 'userID пользователя не валиден',
  wrongAuth: 'Неправильные почта или пароль',
  notFoundUser: 'Запрашиваемый пользователь не найден',
  invalidData: 'Проверьте введенные данные',
  notFoundMovie: 'Запрашиваемый фильм не найден',
  notEnoughRights: 'Не достаточно прав',
  conflict: 'Введенный email уже занят',
  successLogin: 'Вы успешно авторизованы!',
  successLogout: 'Вы успешно разлогинились!',
  notFoundData: 'Запрашиваемый ресурс не найден',
};

const vallidateMessages = {
  nameRequired: 'Поле "name" не должно быть пустым',
  nameMin: 'В поле "name" должно быть минимум 2 символа',
  nameMax: 'В поле "name" должно быть максимум 30 символов',
  passwordRequired: 'Поле "password" не должно быть пустым',
  invalidEmail: 'В поле "email" должен быть введен валидный email',
  emailRequired: 'Поле "email" не должно быть пустым',
  countryRequired: 'Поле "country" не должно быть пустым',
  directorRequired: 'Поле "director" не должно быть пустым',
  durationRequired: 'Поле "duration" не должно быть пустым',
  yearRequired: 'Поле "year" не должно быть пустым',
  descriptionRequired: 'Поле "description" не должно быть пустым',
  invalidImageURL: 'В поле "image" должен быть введен валидный url',
  imageRequired: 'Поле "image" не должно быть пустым',
  invalidTrailerURL: 'В поле "trailer" должен быть введен валидный url',
  trailerRequired: 'Поле "trailer" не должно быть пустым',
  invalidThumbnailURL: 'В поле "thumbnail" должен быть введен валидный url',
  thumbnailRequired: 'Поле "thumbnail" не должно быть пустым',
  movieIdRequired: 'Поле "movieId" не должно быть пустым',
  nameRURequired: 'Поле "nameRU" не должно быть пустым',
  nameENRequired: 'Поле "nameEN" не должно быть пустым',
  invalidMovieId: 'movieId невалиден',
};

module.exports = {
  errorMessages,
  vallidateMessages,
};
