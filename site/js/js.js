let getJSON = function(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload=function () {
        let status = xhr.status;
        if (status === 200){
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
        if (err !== null){
            alert("Error: "+err);
        } else {
            data = data['feed']['entry'];
            console.log(data);
            let out= '';
            for (var i=0; i<data.length;i++){
                if (!data[i]['gsx$show']['$t']==0) {
                    out += `<div class="goods">`;
                    out += `    <p class="title">${data[i]['gsx$title']['$t']}</p>`;
                    out += '';
                    out += `    <div class="container">`;
                    out += `        <img src="${data[i]['gsx$image']['$t']}" height="200" alt="">`;
                    out += `    </div>`;
                    out += `    <div class="text-container">`;
                    let s = data[i]['gsx$content']['$t'];
                    s = s.replace(/\n/g,"<br>");
                    out += `        <p class="content">${s} </p>`;
                    out += `        <p class="date">Змінено: ${data[i]['gsx$date']['$t']} </p>`;
                    out += `    </div>`;
                    out += `</div>`;
                }
            }
            document.getElementById('main').innerHTML = out;
            // let title = document.getElementsById("title");
            // title.style.cssText = "color: blue; border: 1px solid black";
            // document.getElementsByClassName("title").style.cssText = "color: blue; border: 1px solid black";
        }

    });

