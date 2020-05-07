
$(document).ready(function () {

    console.log("1111");

    $.getJSON("https://spreadsheets.google.com/feeds/list/1toYgHL4c74H9McaHiDA_32B-euk-uHyksy5i_NINydI/od6/public/values?alt=json",
        function (data) {
            data = data['feed']['entry'];
            console.log(data);
            showGoods(data);
        });
    function showGoods(data) {
        var out = '';
        for (var i=0; i<data.length;i++){
            if (!data[i]['gsx$show']['$t']==0) {
                out += `<div class="col-lg-3 col-md-3 col-sm-2 text-center">`;
                out += `    <div class="goods">`;
                out += `   <h5>${data[i]['gsx$name']['$t']}</h5>`;
                out += `   <img src="${data[i]['gsx$image']['$t']}" height="200" alt="">`;
                out += `   <p class="cost">Ціна: ${data[i]['gsx$cost']['$t']} грн</p>`;
                out += `   <p class="cost">на складі: ${data[i]['gsx$kg']['$t']}</p>`;
                out += `   <button type="button" class="btn btn-success" name="add-to-card" idTovar="${data[i]['gsx$id']['$t']}">Купити</button>`;
                out += `</div>`;
                out += `</div>`;
            }
        }
        // console.log(out);
        $('.shop-field').html(out);
    }

    document.onclick = function (e) {
        // console.log(e.target.attributes.data.nodeValue);

        if (e.target.attributes.name.nodeValue=="add-to-card") {
            if (e) {
                console.log(e);
                console.log(e.target.attributes);
                console.log(e.target.attributes.idtovar.value);
            }
        }
    }
})