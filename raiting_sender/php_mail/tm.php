<?php


if (strpos(file_get_contents("/mess.txt"), "error")) { //Проверяем файл mess.txt на наличие текста "error"
    $token = "1269081279:AAF5VuApdXlgy7nPuE98TGbnjpMda_94ToQ"; //наш токен от telegram bot -а
    $chatid = "475629378"; //ИД чата telegrm
    $mess = "Ошибка автопостинга. В текстовом файле найдена ошибка, пожалуйста проверьте!"; //сообщение, которое мы удем оправлять
    $tbot = file_get_contents("https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatid . "&text=" . urlencode($mess)); //Если нашли ошибку отправляем  сообщение в телеграмм
} /* Если не нашли ошибку*/
ELSE {

    ECHO "Всё ок!"; //выдаём текст
    message_to_telegram('Привет!');
}



function message_to_telegram($text)
{
    $ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . '1269081279:AAF5VuApdXlgy7nPuE98TGbnjpMda_94ToQ' . '/sendMessage',
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => array(
                'chat_id' => '475629378',
                'text' => $text,
            ),
        )
    );
    curl_exec($ch);
}

