/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
	return new Promise((resolve) => {
		setTimeout(() =>{resolve()}, seconds * 1000)})
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
	return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    request.responseType = 'json';
    request.onload = function() {
        if (request.status === 200) {

          resolve(request.response.sort((a, b) => a.name.localeCompare(b.name)))

        } else {
          reject();
        }
      };
	request.onerror = function() {
	    reject(Error('There was a network error.'));
	};
	request.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
