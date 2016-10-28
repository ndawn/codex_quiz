'use strict';


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.block.add').addEventListener('click', addQuestionBlock);
    document.querySelector('.loading').style.display = 'none';
});


let counter = 2;

let addQuestionBlock = () => {
    let questionBlock = `<div class="question${counter}">
            <div class="lock">\u274c</div>
            <h2>Вопрос ${counter}</h2>
            <input type="text" name="question${counter}.heading" placeholder="Название вопроса">
            <textarea name="question${counter}.body" placeholder="Описание вопроса"></textarea>
            <input type="text" name="question${counter}.ans_1" placeholder="Первый вариант ответа">
            <input id="question${counter}.correct" type="radio" name="question${counter}.correct" value="1">
            <label for="question${counter}.correct">Правильный ответ</label>
            <input type="text" name="question${counter}.ans_2" placeholder="Второй вариант ответа">
            <input id="question${counter}.correct" type="radio" name="question${counter}.correct" value="2">
            <label for="question${counter}.correct">Правильный ответ</label>
            <input type="text" name="question${counter}.ans_3" placeholder="Третий вариант ответа">
            <input id="question${counter}.correct" type="radio" name="question${counter}.correct" value="3">
            <label for="question${counter}.correct">Правильный ответ</label>
        </div>`
    let blockAdd = document.querySelector('.block.add');
    let form = document.querySelector('form');

    form.removeChild(blockAdd);
    form.insertAdjacentHTML('beforeend', questionBlock);
    form.appendChild(blockAdd);

    let cross = document.querySelector('.lock');

    cross.addEventListener('click', () => {cross.parentNode.parentNode.removeChild(cross.parentNode); counter--});
    cross.className = 'close';

    counter++;
};


let insertQuestion = () => {
    document.querySelector('.loading').style.display = 'block';

    let data = new FormData(document.forms.quiz);

    let main = document.querySelector('main');

    while (main.firstChild) {main.removeChild(main.firstChild)};

    let xhr = new XMLHttpRequest();

    data.set('task', 'add');

    xhr.open('POST', '/out.php', true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            main.insertAdjacentHTML('beforeend', '<h1>Новый тест создан</h1>');
            document.querySelector('.loading').style.display = 'none';
        }
    };

    xhr.send(data);
};
