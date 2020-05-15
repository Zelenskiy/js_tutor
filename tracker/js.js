var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var myColor = 'red';
var cW = canvas.style.width;
var cH = canvas.style.height;
cW = 500;
cH = 688;

var x0 = 0;
var y0 = 0;
var wimage = 0;
var himage = 0;
var platform = "Desktop";
if ((navigator.userAgent.match('iPhone'))|| (navigator.userAgent.match('Android'))||
	(navigator.userAgent.match('iPad'))||
	(navigator.userAgent.match('RIM'))){
	platform = "Mobile";
} else {
	platform = "Desktop";
}

var mash = 1;

// var canv = document.getElementById('c1').style.width = cW;
// var canv = document.getElementById('c1').style.height = cH;




var mode = 0; // 0 - виставлення маркерів, 1 - калібрування (точка 1), 2 - перетягування
var kalibr_btn = 0;
var mark_btn = 0;


var k1 = {
	x : 10,
	y : -10,
	color: "red",
};
var k2 = {
	x : 10,
	y : -10,
	color: "red",
};

var m1 = {
	x : 10,
	y : -10,
	color: "red",
};
var m2 = {
	x : 50,
	y : -10,
	color: "green",
};
var m3 = {
	x : 100,
	y : -10,color: "blue",
};

make_base();

function draw_markers(){


	ctx.beginPath();
	ctx.rect(m1.x-5, m1.y-5, 10, 10);
	ctx.strokeStyle = m1.color;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(m2.x-5, m2.y-5, 10, 10);
	ctx.strokeStyle = m2.color;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(m3.x-5, m3.y-5, 10, 10);
	ctx.strokeStyle = m3.color;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(k1.x-5, k1.y-5, 10, 10);
	ctx.strokeStyle = k1.color;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(k2.x-5, k2.y-5, 10, 10);
	ctx.strokeStyle = k2.color;
	ctx.stroke();
	ctx.closePath();


};



function make_base(){
	base_image = new Image();
	base_image.src = './track.png';
	wimage = base_image.width;
	himage = base_image.height;

	console.log("wimage->"+wimage);
	console.log("himage->"+himage);

	// ctx.drawImage(base_image, x0, y0);
	ctx.drawImage(base_image, x0, y0, wimage*mash, himage*mash);

}

function draw_chordes(){
	// обчислюємо центр кола, центри відрізків, радіус кола

	var ma = (m2.y-m1.y)/(m2.x-m1.x);
	var mb = (m3.y-m2.y)/(m3.x-m2.x);
	var x0 = (ma*mb*(m1.y-m3.y)+mb*(m1.x+m2.x)-ma*(m2.x+m3.x))/(2*(mb-ma));
	var y0 = -1/ma*(x0-(m1.x+m2.x)/2)+(m1.y+m2.y)/2;
	var x12 = (m1.x+m2.x)/2;
	var y12 = (m1.y+m2.y)/2;
	var x23 = (m2.x+m3.x)/2;
	var y23 = (m2.y+m3.y)/2;
	var r = Math.sqrt((m1.x-x0)*(m1.x-x0)+(m1.y-y0)*(m1.y-y0));
	var tmp = document.getElementById("calibr_edit").value;

	tmp = tmp.replace(',','.');
	var mashtab = parseFloat(tmp);
	console.log("mashtab->"+mashtab);
	var kalibr_length = Math.sqrt((k1.x-k2.x)*(k1.x-k2.x)+(k1.y-k2.y)*(k1.y-k2.y));
	var R = r * mashtab / kalibr_length;
	document.getElementById("lbl2").innerText = "R = " + R;

	ctx.beginPath();
	ctx.moveTo(m1.x, m1.y);
	ctx.strokeStyle ="blue";
	ctx.stroke();
	ctx.lineTo(m2.x, m2.y);
	ctx.stroke();
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.moveTo(x12, y12);
	ctx.lineTo(x0, y0);
	ctx.stroke()
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(m2.x, m2.y);
	ctx.strokeStyle ="red";
	ctx.stroke();
	ctx.lineTo(m3.x, m3.y);
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.moveTo(x23, y23);
	ctx.lineTo(x0, y0);
	ctx.stroke()
	ctx.closePath();

	//Малюємо дугу
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle ="green";
	ctx.arc(x0,y0,r, 0, 2 * Math.PI);
	ctx.stroke()
	ctx.closePath();
};


document.getElementById('o1').onclick = function(){
	mode = 0;
	mark_btn = 1;
};
document.getElementById('o2').onclick = function(){
	mode = 0;
	mark_btn = 2;
};
document.getElementById('o3').onclick = function(){
	mode = 0;
	mark_btn = 3;
};
document.getElementById('k1').onclick = function(){
	mode = 1;
	kalibr_btn = 1;
};
document.getElementById('k2').onclick = function(){
	mode = 1;
	kalibr_btn = 2;
};

// document.getElementById('calibr').onclick = function(){
// 	var card = document.getElementById("calibr");
// 	if (mode != 1) card.selectedIndex = 1;
// 	mode = 1;
// };

document.getElementById('btn_draw').onclick = function(){
	make_base();
	draw_markers();
	if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
		draw_chordes();
	}
};

// document.getElementById('btn_calibr').onclick = function(){
// 	mode = 1;
// 	var card = document.getElementById("calibr");
// 	card.selectedIndex = 0;
//
// };

document.getElementById('btn_clear').onclick = function(){
	ctx.clearRect(0,0,cW,cH);
	make_base();
};

document.getElementById('btn_zoom_up').onclick = function(){
	console.log("btn_zoom_up");
	mash += mash*0.2;
	ctx.clearRect(0,0,cW,cH);
	make_base();
	draw_markers();
	if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
		draw_chordes();
	}
};

document.getElementById('btn_zoom_default').onclick = function(){
	mash =1;
	x0=0; y0=0;
	ctx.clearRect(0,0,cW,cH);
	make_base();
	draw_markers();
	if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
		draw_chordes();
	}
};

document.getElementById('btn_zoom_down').onclick = function(){
	mash -= mash*0.2;
	ctx.clearRect(0,0,cW,cH);
	make_base();
	draw_markers();
	if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
		draw_chordes();
	}
};

document.getElementById('btn_drag').onclick = function(){
	mode = 2;
};

var xx0 = 0;
var yy0 = 0;
ssss();

function ssss(){
	if (platform=="Mobile"){
		// document.getElementById("c1").style.width = "100%";

		// document.getElementById("c1").style.height = yImage
		let w = window.innerWidth-40;
		let h = window.innerHeight-40;
		// var xImage = document.getElementById("c1").offsetWidth;
		// var yImage = document.getElementById("c1").offsetHeight;
		document.getElementById("c1").style.width = w+"px";
		document.getElementById("c1").style.height = parseInt(h - h/10)+"px";
		document.getElementById("c1").setAttribute("width",String(w));
		document.getElementById("c1").setAttribute("height",String(parseInt(h - h/10)));

		document.getElementById("xcont").style.position = "absolute";
		document.getElementById("xcont").style.width = "50%";
		document.getElementById("xcont").style.zIndex = "1";
		document.getElementById("xcont").style.top = "-100px";
		document.getElementById("xcont").style.left = "20px";
		document.getElementById("xcont").style.padding = "20px 20px 20px 20px";



		/*#xcont {*/
		/*	position: absolute;*/
		/*	width: 50%;*/
		/*	z-index: 1;*/
		/*	top: 50px;*/
		/*	left: 50px;*/
		/*	padding: 20px 20px 20px 20px ;*/
		/*}*/



		make_base();
	} else {
		document.getElementById("c1").style.width ="500px";
		document.getElementById("c1").style.height = "688px";
		document.getElementById("c1").setAttribute("width","500");
		document.getElementById("c1").setAttribute("height","688");
		// document.getElementById("c1").style.top = 0+"px";
		make_base();
	}
}

window.onresize = function () {
	ssss();
}

//document.querySelector('#out').innerHTML = navigator.userAgent;


if (platform=="Mobile"){
	canvas.onpointerdown = function(event){
		var r1 = Math.sqrt((event.offsetX - m1.x)*(event.offsetX - m1.x)+(event.offsetY - m1.y)*(event.offsetY - m1.y));
		var r2 = Math.sqrt((event.offsetX - m2.x)*(event.offsetX - m2.x)+(event.offsetY - m2.y)*(event.offsetY - m2.y));
		var r3 = Math.sqrt((event.offsetX - m3.x)*(event.offsetX - m3.x)+(event.offsetY - m3.y)*(event.offsetY - m3.y));
		if (r1<5){
			mark_btn = 1;
		} else if (r2<5){
			mark_btn = 2;
		} else if (r3<5){
			mark_btn = 3;
		};
		xx0 = event.offsetX;
		yy0 = event.offsetY;

		draw_markers();

		canvas.onpointermove = function(event){
			ctx.clearRect(0,0,cW,cH);
			if (mode == 0) {

				var card = document.getElementById("markers");
				if (mark_btn== 1) {
					m1.x = event.offsetX;
					m1.y = event.offsetY;
				} else if (mark_btn == 2) {
					m2.x = event.offsetX;
					m2.y = event.offsetY;
				} else if (mark_btn == 3) {
					m3.x = event.offsetX;
					m3.y = event.offsetY;
				};




				make_base();
				draw_markers();

				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			} else if (mode == 1){
				var card = document.getElementById("calibr");
				if (kalibr_btn == 1){
					k1.x = event.offsetX;
					k1.y = event.offsetY;
				} else if (kalibr_btn == 2){
					k2.x = event.offsetX;
					k2.y = event.offsetY;
				}
				make_base();
				draw_markers();
				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			} else if (mode == 2){
				x0 += event.offsetX - xx0;
				y0 += event.offsetY - yy0;
				xx0 =  event.offsetX;
				yy0 =  event.offsetY;
				make_base();
				draw_markers();
				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			}


		}
		canvas.onpointerup = function(){
			canvas.onpointermove = null;
			console.log("x0="+x0+"  y0="+y0);
		}
	}
}else {
	canvas.onmousedown = function(event){
		var r1 = Math.sqrt((event.offsetX - m1.x)*(event.offsetX - m1.x)+(event.offsetY - m1.y)*(event.offsetY - m1.y));
		var r2 = Math.sqrt((event.offsetX - m2.x)*(event.offsetX - m2.x)+(event.offsetY - m2.y)*(event.offsetY - m2.y));
		var r3 = Math.sqrt((event.offsetX - m3.x)*(event.offsetX - m3.x)+(event.offsetY - m3.y)*(event.offsetY - m3.y));
		if (r1<5){
			mark_btn = 1;
		} else if (r2<5){
			mark_btn = 2;
		} else if (r3<5){
			mark_btn = 3;
		};
		xx0 = event.offsetX;
		yy0 = event.offsetY;

		draw_markers();

		canvas.onmousemove = function(event){
			ctx.clearRect(0,0,cW,cH);
			if (mode == 0) {
				var card = document.getElementById("markers");
				if (mark_btn== 1) {
					m1.x = event.offsetX;
					m1.y = event.offsetY;
				} else if (mark_btn == 2) {
					m2.x = event.offsetX;
					m2.y = event.offsetY;
				} else if (mark_btn == 3) {
					m3.x = event.offsetX;
					m3.y = event.offsetY;
				};




				make_base();
				draw_markers();

				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			} else if (mode == 1){
				var card = document.getElementById("calibr");
				if (kalibr_btn == 1){
					k1.x = event.offsetX;
					k1.y = event.offsetY;
				} else if (kalibr_btn == 2){
					k2.x = event.offsetX;
					k2.y = event.offsetY;
				}
				make_base();
				draw_markers();
				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			} else if (mode == 2){
				x0 += event.offsetX - xx0;
				y0 += event.offsetY - yy0;
				xx0 =  event.offsetX;
				yy0 =  event.offsetY;
				make_base();
				draw_markers();
				if ((m1.y > 0) && (m2.y > 0) && (m3.y > 0)) {
					draw_chordes();
				}
			}


		}
		canvas.onmouseup = function(){
			canvas.onmousemove = null;
			console.log("x0="+x0+"  y0="+y0);
		}
	}
}