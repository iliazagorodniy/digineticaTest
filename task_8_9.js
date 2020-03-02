// 8.
// Написать функцию для получения список всех артикулов товаров
// в консоли браузера на странице
// https://groupprice.ru/categories/jenskaya-odejda?referer_from=main_catalog

// function getItemsNumbers() {
//     let itemsContainer = document.getElementById("categories_multiple");
//     let items = itemsContainer.querySelectorAll(".product-item");
//     // console.log(items);
//     let counter = 1;
//     items.forEach( item => {
//         console.log(`item number ${counter}: `,item.dataset.id);
//         counter++;
//     });
// }
//
// getItemsNumbers();

//     9.
// Написать функцию для получения всех характеристики товара в консоли
// браузера в виде объекта в формате attributeName: value на
// странице https://nir-vanna.ru/product/smesitel-bravat-art-f175109c-dlya-rakoviny/

function getItemCharacteristic() {
    // Инициализируем объект в который потом загоним характеристики товара
    let chObj = {};
    // Смотрим разметку сайта, находим контейнер, содержащий все характеристики товара, чтобы было удобно их дернуть
    let chContainer = document.getElementById("tab2");
    // Получим все ul, содержащие характеристики
    let chLists = chContainer.querySelectorAll("ul.haracteristics");
    // инициализируем массив
    let listItemsArr = [];
    // пройдемся по всем найденным ранее ul чтобы выцепить из них li
    chLists.forEach(list => {
        // в каждом ul больше одного li
        let listItemsNode = list.querySelectorAll(".haracteristics__item");
        // Здесь мы проходимся по каждой ноде, чтобы получить массив из li
        listItemsNode.forEach(list_item => {
            listItemsArr.push(list_item);
        });
    });
    // инициализируем два массива с дивами, содержащими названия и значения аттрибутов
    let attributeNameDivs = [];
    let attributeValueDivs = [];
    // пройдемся по всем li и закинем дивы внутрь каждого масива соответственно
    listItemsArr.forEach(listItem => {
        attributeNameDivs.push(listItem.querySelector(".col-1"));
        attributeValueDivs.push(listItem.querySelector(".col-2"));
    });
    // инициализируем два массива в которых будут храниться строки с названиями и значениями атрибутов, выцепленные из дивов
    let attributeNames = [];
    let attributeValues = [];
    attributeNameDivs.forEach(div => {
        // некоторые аттрибуты снабжены иконкой с дополнительной информацией,
        // если использовать innerText, так что если такой иконки нет, значит и дочерних элементов нет
        if(div.children.length === 0) {
            // используем функцию trim() чтобы обрезать пробелы в начале и конце строки, чтобы было удобнее читать итоговый объект
            attributeNames.push(div.innerText.trim());
        } else {
            // Если иконка с дополнительной информацией все же есть,
            // то при помощи инструментов разработчика покопаемся в свойствах полученного дива, найдем там элемент,
            // в который записано только название свойства и добавим его в массив имен аттрибутов для дальнейшего использования
            attributeNames.push(div.children[0].children[1].children[0].innerText.trim());
        }
    });
    // Заполним массив значений аттрибутов
    attributeValueDivs.forEach(div => {
        attributeValues.push(div.innerText.trim());
    });
    // заполним объект значениями из массивов ключей(имен) и значений соответственно
    for (let i = 0; i < attributeNames.length; i++) {
        chObj[attributeNames[i]] = attributeValues[i];
    }
    return chObj;
}

let result = getItemCharacteristic();
console.log(result);
