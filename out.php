<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['task']) {
    $db = mysqli_connect('localhost', 'www', 'ff9b12992f3d239c654cc1ff12ca373e', 'codex_quiz');
    if ($_POST['task'] == 'quiz') {
        $query = mysqli_query($db, 'select * from quiz_quiz');
        if ($query->num_rows == 0) {
            echo '{"rows": []}';
        } else if ($query->num_rows == 1) {
            echo '{"rows": [' . json_encode($query->fetch_assoc()) . ']}';
        } else {
            $out = '{"rows": [';
            foreach ($query as $row) {
                $out .= json_encode($row) . ',';
            };
            $out = substr($out, 0, strlen($out) - 1);
            $out .= ']}';
            echo $out;
        }
    } else if ($_POST['task'] == 'questions') {
        $query = mysqli_query($db, 'select quiz_question.* from quiz_question join quiz_quiz on quiz_question.quiz_id = quiz_quiz.id where quiz_id = ' . $_POST['quiz_id']);
        $out = '{"rows": [';
        foreach ($query as $row) {
            $out .= json_encode($row) . ',';
        };
        $out = substr($out, 0, strlen($out) - 1);
        $out .= ']}';
        echo $out;
    } else if ($_POST['task'] == 'add') {
        mysqli_query($db, 'insert into quiz_quiz (heading, body) values (' . $_POST['quiz.heading'] . ', ' . $_POST['quiz.body'] . ')');
        $quiz_id = mysqli_insert_id($db);
        unset($_POST['quiz.heading']);
        unset($_POST['quiz.body']);
        $questions = Array();
        foreach ($_POST as $row) {
            $key = preg_split('/[.]/', substr(key($_POST), 8, strlen(key($_POST)) - 8));
            if (!$questions[$key[0]]) {
                $questions[$key[0]] = Array();
            }
            $questions[$key[0]][$key[1]] = $row;
        };
        foreach ($questions as $row) {
            mysqli_query($db, 'insert into quiz_question (heading, body, ans_1, ans_2, ans_3, correct, quiz_id) values (' . $row['heading'] . ', ' . $row['body'] . ', ' . $row['ans_1'] . ', ' . $row['ans_2'] . ', ' . $row['ans_3'] . ', ' . $row['correct'] . ', ' . $quiz_id);
        }
        echo 'Loaded quiz (id: ' . $quiz_id . ')';
    };
} else {http_response_code(400);};

?>
