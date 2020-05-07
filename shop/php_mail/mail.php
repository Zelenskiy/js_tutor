<?php
// Сообщение
//$to ='alexandr.s.zelenskiy@gmail.com';
$subject = $_POST['subject'];
$to = $_POST['to'];
$message = $_POST['message'];
$mail = mail($to, $subject, $message);
if ($mail){
    echo "yes";
} else {
    echo "no";
}
?>
