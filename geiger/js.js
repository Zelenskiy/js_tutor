window.onload = function () {
    set_pos_elem();


    window.onresize = function(){
        set_pos_elem();
    }

    function set_pos_elem(){
        var im = document.getElementById("image");
        var im_w = im.width;
        var im_h = im.height;
        var b_w = parseInt(im_w/5);
        var b_h = parseInt(im_h/6.5);
        var b_t = parseInt(im_h / 6);
        var l_t = parseInt(im_h / 2.5+12);
        var l_w = parseInt(im_w / 2.2);
        var l_h = parseInt(im_h / 14);


        document.getElementById("button_on").style.width = b_w +"px";
        document.getElementById("button_on").style.height = b_h +"px";
        document.getElementById("button_on").style.right = 10 +"px";
        document.getElementById("button_on").style.top = b_t +"px";

        document.getElementById("lbl").style.width = l_w +"px";
        document.getElementById("lbl").style.height = l_h +"px";
        document.getElementById("lbl").style.right = parseInt(im_w/3.5+15) +"px";
        document.getElementById("lbl").style.top = l_t +"px";
        document.getElementById("lbl").style.fontSize = parseInt(im_h/15)+"px";

    }

    // document.getElementById('mn').innerText = "hello";

    // base_image = new Image();
    // base_image.src = './images/d1.png';


    let start = false;
    const engine = new Audio('./audio/alarm.mp3');
    const bip = new Audio('./audio/bip1.mp3');
    // const audio = new Audio('./audio/car.mp3');
    engine.loop = false;
    engine.volume = 0.3;
    bip.loop = false;
    bip.volume = 0.3;

    function sayHi() {

        setTimeout(sayHi, 500);
        if (start){
            console.log("безкінечний цикл");
            if (Math.random()<0.5001){
                bip.play();
            }
        }
    }

    setTimeout(sayHi, 1000);


    document.querySelector('.start').addEventListener('click', function () {
        if (start === false) {
            start = true;
            this.innerHTML = 'stop';
            document.getElementById("lbl").innerText ="0.00";
            // engine.play();
        }
        else {
            // глушим
            start = false;
            this.innerHTML = 'start';
            document.getElementById("lbl").innerText ="";
            // engine.pause();

        }
    });


}