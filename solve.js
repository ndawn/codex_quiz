'use strict';


let xhr = new XMLHttpRequest();
let data = new FormData();

data.set('task', 'quiz');

xhr.open('POST', '/out.php', true);

xhr.onreadystatechange = (() => {
    if (xhr.readyState == 4) {
        let rows = JSON.parse(xhr.responseText).rows;

        if (rows.length) {
            rows.forEach((row, i, rows) => {
                document.querySelector('main').insertAdjacentHTML('beforeend',
                    `<div class="lock"><div><h1>${row.heading}</h1><p>${row.body}</p></div><div class="border"></div></div>`);
                document.querySelector('.lock').addEventListener('click', () => {startQuiz(row.id)});
                document.querySelector('.lock').className = 'block';
            });
        } else {
            document.querySelector('main').insertAdjacentHTML('beforeend',
                '<a href="/add.html"><div class="block add"><div><p>Добавить тест</p></div><div class="border"></div></div></a>');
        }
        document.querySelector('.loading').style.display = 'none';
    };
});

xhr.send(data);


function startQuiz(quiz_id, timeout) {
    {

    document.querySelector('.loading').style.display = 'block';

    let xhr = new XMLHttpRequest();
    let data = new FormData();

    xhr.open('POST', '/out.php', true);

    data.set('task', 'questions');
    data.set('quiz_id', quiz_id);

    xhr.onreadystatechange = (() => {
        let questions = JSON.parse(xhr.responseText).rows;
        let index = 0;
        let passed = 0;

        showQuestionsChain(questions, index, passed);

        document.querySelector('.loading').style.display = 'none';
    });

    xhr.send(data);

    }
}


let showQuestionsChain = (questions, index, passed) => {
    let main = document.querySelector('main');
    while (main.firstChild) {main.removeChild(main.firstChild)};

    main.insertAdjacentHTML('beforeend', `<h1>${questions[index].heading}</h1><h3>${questions[index].body}</h3><div class="block answer 1"><h2>${question[index].ans_1}</h2><div class="border"></div></div><div class="block answer 2"><h2>${question[index].ans_2}</h2><div class="border"></div></div><div class="block answer 3"><h2>${question[index].ans_3}</h2><div class="border"></div></div>`);
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="timer"><div></div></div>');
    document.querySelector('.timer').style.transition = 'width ' + questions[index].timeout / 1000 + 's linear';
    setTimeout(() => {revealAnswer(false, null, questions, index, passed)}, questions[index].timeout);
    index++;
}

let revealAnswer = (answerGiven, answer, questions, index, passed) => {

}
