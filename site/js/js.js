var d="";

console.log(window.location);
var strGET = window.location.search.replace('?', '');
console.log("qqqq--<> "+strGET);

let getJSON = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
getJSON('https://spreadsheets.google.com/feeds/list/1yoiBBCXP-x8mO2BHM3wZzsLSQi2XEGp_9eWM97eEgJY/od6/public/values?alt=json',
    function (err, data) {
        console.log(data);
        if (err !== null) {
            alert("Error: " + err);
        } else {
            data = data['feed']['entry'];
            d = data;
        }
    });

if (strGET == "") {
    console.log("d="+d);
    if (d.length>0){
        console.log(d);
        let out = '';
        for (let i = 0; i < d.length; i++) {
            if (!d[i]['gsx$show']['$t'] == 0) {
                out += `<div class="goods">`;
                out += `    <p class="title" onclick="read_news(` + i + `);">${d[i]['gsx$title']['$t']}</p>`;
                out += '';
                out += `    <div class="image-container">`;
                out += `        <img src="${d[i]['gsx$image']['$t']}" height="200" alt="">`;
                out += `    </div>`;
                out += `    <div class="text-container">`;
                let s = d[i]['gsx$content']['$t'];
                s = s.replace(/\n/g, "<br>");
                if (s.length > 500) {
                    s = s.substring(0, 500) + '... ' + '<span class="read-next"  onclick="read_news(' + i + ');">Читати далі </span>';
                }
                out += `        <p class="content">${s} </p>`;
                out += `        <p class="date">Змінено: ${d[i]['gsx$date']['$t']} </p>`;
                out += `    </div>`;
                out += `</div>`;
            }
        }
        document.getElementById('main').innerHTML = out;
    }

}


function read_news(i) {
    let out = '';
    out += `<div class="goods">`;
    out += `    <p class="title">${d[i]['gsx$title']['$t']}</p>`;
    out += '';
    // out += `    <div class="image-container">`;
    // out += `        <img src="${d[i]['gsx$image']['$t']}" height="200" alt="">`;
    // out += `    </div>`;
    out += `    <div class="text-container">`;
    // let s = d[i]['gsx$content']['$t'];
    out += `        <p class="content">${d[i]['gsx$content']['$t']} </p>`;
    out += `        <p class="date">Змінено: ${d[i]['gsx$date']['$t']} </p>`;
    out += `    </div>`;
    out += `</div>`;
    document.getElementById('main').innerHTML = out;
}

