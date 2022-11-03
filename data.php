<?php

function Json($content = null, $header = 'Content-type: application/json')
{
    header($header);
    if (!empty($content)) {
        echo $content;
    }
    else {
        echo '';
    }
    die();
}

function getData($search = null)
{
    $file = 'data.txt';
    $data = [
        [
            'name' => 'Niedrzwica duża',
            'btn' => 'buttons set',
        ],
        [
            'name' => 'Tarnobrzeg',
            'btn' => 'buttons set',
        ],
        [
            'name' => 'Radomyśl',
            'btn' => 'buttons set',
        ],
    ];


    return $data;
}

if (isset($_GET['string'])) {

    if ($_GET['string'] == 'search') {

        $s = filter_var($_GET['s'], FILTER_SANITIZE_STRING);
        $data = getData($s);
        Json($data);
    }
}
