var d = "";

var strGET = window.location.search.replace('?', '');

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
            if (strGET === "") {
                show_all_news(data['feed']['entry']);
            } else {
                let name_p = strGET.substring(0, strGET.indexOf("="));
                let value_p = (strGET.substring(strGET.indexOf("=") + 1)).trim();
                if (name_p === "news") {
                    show_news(data['feed']['entry'][value_p], value_p);
                } if (name_p === "pages") {
                    get_page(value_p);

                }
            }
        }
    });

function get_page(p) {
    getJSON('https://spreadsheets.google.com/feeds/list/1yoiBBCXP-x8mO2BHM3wZzsLSQi2XEGp_9eWM97eEgJY/2/public/values?alt=json',
        function (err, data_p) {
            console.log(data_p);
            if (err !== null) {
                alert("Error: " + err);
            } else {
                console.log(data_p);

                show_news(data_p['feed']['entry'][p],p);

            }
        });
}

function show_all_news(d) {
    let out = "";
    for (let i = 0; i < d.length; i++) {
        if (!d[i]['gsx$show']['$t'] == 0) {
            out += `<div class="goods">`;
            out += `    <p class="title" onclick="reload_news(` + i + `);">${d[i]['gsx$title']['$t']}</p>`;
            out += '';
            out += `    <div class="image-container">`;
            out += `        <img src="${d[i]['gsx$image']['$t']}" height="200" alt="">`;
            out += `    </div>`;
            out += `    <div class="text-container">`;
            let s = d[i]['gsx$content']['$t'];
            s = s.replace(/\n/g, "<br>");
            if (s.length > 500) {
                s = s.substring(0, 500) + '... ' + '<span class="read-next"  onclick="reload_news(' + i + ');">Читати далі </span>';
            }
            out += `        <p class="content">${s} </p>`;
            out += `        <p class="date">Змінено: ${d[i]['gsx$date']['$t']} </p>`;
            out += `    </div>`;
            out += `</div>`;
        }
    }
    document.getElementById('main').innerHTML = out;
}

function show_news(d, i) {
    let out = "";
    if (!d['gsx$show']['$t'] == 0) {
        out += `<div class="goods">`;
        out += `    <p class="header" onclick="reload_news(` + i + `);">${d['gsx$title']['$t']}</p>`;
        out += '';
        out += `    <div class="image-container">`;
        out += `        <img src="${d['gsx$image']['$t']}" height="200" alt="">`;
        out += `    </div>`;
        out += `    <div class="text-container">`;
        let s = d['gsx$content']['$t'];
        let ss = s.split(/\n/g);
        s = "";
        for (let i=0; i<ss.length;i++){
            s+=`<p>`+ss[i]+`</p>`;
        }

        s = s.replace("<p></p><p></p>", "<p></p>");
        // s = s.replace(/\n/g, "<br>");
        out += `        <p class="content">${s} </p>`;
        out += `        <p class="date">Змінено: ${d['gsx$date']['$t']} </p>`;
        out += `    </div>`;
        out += `</div>`;

    }
    document.getElementById('main').innerHTML = out;
}

function reload_news(i) {
    window.location = "./index.html?news=" + i;
}

