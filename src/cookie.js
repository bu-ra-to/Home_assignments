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
        filterNameInput.innerHTML = '';
        if (!(filterNameInput.value == '')) {
            visibleOnThePage();
        }
    });
    /// 1.1 функция создающая ячейки с куками
    function visibleOnThePage() {
        let result = getCookies();
        let cleanList = Cleaner();
        let cookiePairs = Object.entries(result);
        let cookieNames = Object.keys(result);
        let cookieValues = Object.values(result);

        //// 1.1.1 создание ячейки с именем и значением визуально на странице
        function listCreator() {
            let visibleOnThePage = cookiePairs.map(x => {
                let newRow = document.createElement('tr');
                let nameTd = document.createElement('td');
                let valueTd = document.createElement('td');
                nameTd.innerText = x[0];
                valueTd.innerText = x[1];
                newRow.appendChild(nameTd);
                newRow.appendChild(valueTd);
                listTable.appendChild(newRow);
            });
        }
        ///1.1.2 Если нет введеного текста для фильтрации 

        if (filterNameInput.value == '') {
            listCreator()
            // ///1.1.3 Если есть текст для фильтрации 
        } else {
            ///Фильтрация по совпадениям в имени
            let filterNames = cookieNames.map((e) => {
                if (isMatching(e, filterNameInput.value)) {

                    let newRow = document.createElement('tr');
                    let nameTd = document.createElement('td');
                    let valueTd = document.createElement('td');
                    nameTd.innerText = e;
                    valueTd.innerText = cookieValues[cookieNames.indexOf(e)];
                    newRow.appendChild(nameTd);
                    newRow.appendChild(valueTd);
                    listTable.appendChild(newRow);


                }

            })
            ///// Фильтрация по совпадениям в значении
            let filterValues = cookieValues.map((e) => {
                if (isMatching(e, filterNameInput.value)) {
                    let newRow = document.createElement('tr');
                    let nameTd = document.createElement('td');
                    let valueTd = document.createElement('td');
                    nameTd.innerText = cookieNames[cookieValues.indexOf(e)];
                    valueTd.innerText = e;
                    newRow.appendChild(nameTd);
                    newRow.appendChild(valueTd);
                    listTable.appendChild(newRow);
                }

            })
        }
    }



    // 2. здесь можно обработать нажатие на кнопку "добавить cookie"
    addButton.addEventListener('click', () => {
        if (filterNameInput.value == '') {
            getCookies();
            document.cookie = `${addNameInput.value}=${addValueInput.value}`;
            visibleOnThePage();

            /// 2.2 Отчистка поля для введения новых кук  

            addNameInput.value = '';
            addValueInput.value = '';
        }
    });


    // // 3. Get cookies name and value

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
        // while (listTable.hasChildNodes()) {
        //     listTable.removeChild(listTable.firstChild);
        // };
        listTable.innerHTML = '';

    };

    /// 5. Появление кнопки "Удалить"
    listTable.addEventListener('mouseover', (e) => {
        let rowToRemove = e.target.parentNode;

        if (rowToRemove.tagName === "TR" && rowToRemove.children.length < 3) {
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

