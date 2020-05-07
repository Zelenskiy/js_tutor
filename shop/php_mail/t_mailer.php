
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Hello, world!</title>
</head>
<body>
<div class="form__wrapper">
      <form id="form-contact" method="POST" class="form-element" autocomplete="off">
        <p class="form-title">Закажите обратный звонок и наш консультант свяжется с вами</p>
        <p class="form-message"></p>
          <input name="name" type="text" class="form-input__name" tabindex="0" placeholder="Введите ваше имя" required>
          <input name="phone" type="tel" class="form-input__phone" tabindex="0" pattern="^[ 0-9]+$" placeholder="Введите ваш телефон" required>
          <input name="theme" type="hidden" class="form-input__theme"  value="Заявка с сайта">
          <input type="submit" class="form-input__button" value="Отправить">
      </form>
    </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="telegramform.js"></script>

</body>
</html>