/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// 1. здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
filterNameInput.addEventListener('keyup', function() {
    visibleOnPage();
});


// 2. здесь можно обработать нажатие на кнопку "добавить cookie"
addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    visibleOnPage();
});

// 3. Get cookies name and value

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;
            return obj;
        }, {});
};

/// 4. Отчистка, чтоб куки не повторялись
function Cleaner() {
    listTable.innerHTML = '';

};

/// 5. Появление кнопки "Удалить"
listTable.addEventListener('mouseover', (e) => {
    let rowToRemove = e.target.parentNode;

    if (rowToRemove.tagName === "TR") {
        rowToRemove.appendChild(deleteButton);
    }

})

/// 6. Удаление куков при нажатии кнопки "Удалить"

let deleteButton = document.createElement('button');
deleteButton.innerText = 'Удалить';

deleteButton.addEventListener('click', e => {
    let rowToRemove = e.target.parentNode;
    let cookie = rowToRemove.firstElementChild.innerText;
    if (rowToRemove.tagName === "TR") {
        listTable.removeChild(rowToRemove);
    }
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

});

//// 7.  Поиск совпадений в поле фильтрации и куках

function isMatching(full, chunk) {
    if (full.toLowerCase().includes(chunk.toLowerCase())) {
        return true
    } else { return false }

}
/// 8. Добавление списка на страницу
function visibleOnPage() {
    let result = getCookies();
    Cleaner();
    for (let key in result) {
        if (!(isMatching(key, filterNameInput.value) || isMatching(result[key], filterNameInput.value))) {
            continue;
        }
        listTable.innerHTML += `<tr><td class="first_td">${key}</td><td>${result[key]}</td></tr>`;
    }

}