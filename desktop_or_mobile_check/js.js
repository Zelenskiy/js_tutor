window.onload = function () {
    document.querySelector('#out').innerHTML = navigator.userAgent;
    if ((navigator.userAgent.match('iPhone'))|| (navigator.userAgent.match('Android'))||
        (navigator.userAgent.match('iPad'))||
        (navigator.userAgent.match('RIM'))){
        document.querySelector('#out').innerHTML = "Mobile";
    } else {
        document.querySelector('#out').innerHTML = "Desktop";
    }
}