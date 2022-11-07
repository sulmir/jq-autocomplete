<?php

function Json($content = null, $header = 'Content-type: application/json')
{
//    header($header);

    if (!empty($content)) {
        echo json_encode($content, JSON_PRETTY_PRINT);
    }
    else {
        json_encode('', JSON_PRETTY_PRINT);
    }
    die();
}

function getData($search = null)
{
    $file = __DIR__ . DIRECTORY_SEPARATOR
        . DIRECTORY_SEPARATOR . 'data'
        . DIRECTORY_SEPARATOR . 'proxy_list.txt';
    $fileData = file_get_contents($file);
    $fileData = preg_split('/[\n\r]+/', $fileData);
    $fileDataRow = [];
    $search = strtoupper($search);

    foreach ($fileData as $row) {
        if (@strstr($row, $search)) {
            $rowExplode = preg_split('/[\s]+/', $row);

            foreach ($rowExplode as $item) {
                if (@strstr($item, $search)) {
                    $itemNameExplode = explode('_', $item);

                    foreach ($itemNameExplode as $itemNameExplodeItem) {
                        if (@strstr($itemNameExplodeItem, $search)) {
                            $fileDataRowName = $itemNameExplodeItem;
                            break;
                        }
                    }
                    $fileDataRow [] = $fileDataRowName;
                    break;
                }
            }
        }
    }
    $return = array_unique($fileDataRow);
    sort($return, SORT_NATURAL);

    return $return;
}

function getFullData($search = null)
{
    $file = __DIR__ . DIRECTORY_SEPARATOR
        . DIRECTORY_SEPARATOR . 'data'
        . DIRECTORY_SEPARATOR . 'proxy_list.txt';
    $fileData = file_get_contents($file);
    $fileData = preg_split('/[\n\r]+/', $fileData);
    $fileDataRow = [];
    $fileDataRowItems = [];

    foreach ($fileData as $row) {

        if (@strstr($row, $search)) {
            $rowExplode = preg_split('/[\s]+/', $row);
            $fileDataRowItems = [];

            foreach ($rowExplode as $item) {
                $fileDataRowItems [] = $item;
            }
            $fileDataRow [] = $fileDataRowItems;
        }
    }

//    sort($fileDataRow, SORT_NATURAL);

    return $fileDataRow;
}

if (isset($_GET['action'])) {

    if ($_GET['action'] == 'search') {

        $keyword = filter_input(INPUT_POST, 'keyword', FILTER_SANITIZE_SPECIAL_CHARS);
        $data = getData($keyword);
        Json($data);
    }

    if ($_GET['action'] == 'search_callback') {

        $keyword = filter_input(INPUT_POST, 'keyword', FILTER_SANITIZE_SPECIAL_CHARS);
        $data = getFullData($keyword);
        Json($data);
    }
}
