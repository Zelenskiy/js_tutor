
$(document).ready(function () {
    var table10 = "https://spreadsheets.google.com/feeds/list/1rEpRctv3dPRS3lZQpQZD4Xu8FSiKpB6RXGlA4S8i_Ys/od6/public/values?alt=json";

    $.getJSON(table10,
        function (data) {
            data = data['feed']['entry'];
            console.log(data);
            showRate(data);
            // var re = /[0-9]/;
            // var sample= " ";
            // var OK = sample.match(re);
            // if (!OK)
            //     window.alert("NO");
            // else
            //     window.alert("YES");

        });
    function showRate(data) {

        var form_count = 20;
        var re = /[0-9]/;

        // var pole_list = [];
        // var date_list = [];
        for (var i=0; i<data.length;i++){
            // if (data[i]['gsx$show']['$t'] == "№"){
            //     for(j=1;j<18;j++){
            //         var ss = 'gsx$d'+j;
            //         date_list[j] = data[i][ss]['$t'];
            //     }
            //     continue;
            // }
            var out = '';
            if (data[i]['gsx$num']['$t'].match(re)) {
                if (!data[i]['gsx$show']['$t'] == 0) {
                    if (!data[i]['gsx$email']['$t'] == "") {
                        var s =`${data[i]['gsx$num']['$t']}`;
                        // console.log(s);
                        out += '<style>table, td, h3, h4 {padding: 5px 5px 5px 5px ; font-family: Arial}</style>';
                        out += '<h3>' + `${data[i]['gsx$student']['$t']}` + '</h3>';
                        out += '<h4>' + `${data[0]['gsx$student']['$t']}` + '</h4>';
                        out += '<style>td {text-align: center;}</style>';
                        out += '<style>thead {background: #2f5bb7;color: #ffffff;}</style>';


                        out += `<table style=" border-collapse: collapse;">`;
                        out += `<tr  class="row">`;


                        out += `<thead>`;
                        out += `<td >`;
                        out += 'Дата';
                        out += `</td>`;
                        out += `<td>`;
                        out += 'Форма роботи';
                        out += `</td>`;
                        out += `<td>`;
                        out += 'Оцінка';
                        out += `</td>`;
                        out += `</tr>`;
                        out += `</thead>`;

                        for (var j=1; j<=18; j++){
                            // if (data[0][ss]['$t'] != '') {
                                var ss = 'gsx$d' + j;
                                // console.log(ss);
                                // console.log(`${data[i][ss]['$t']}`);

                                if (j%2!=0)
                                    out += `<tr>`;
                                else
                                    out += `<tr style="background: rgba(189,222,255,0.51);">`;

                                out += `<td>`;
                                out += `${data[0][ss]['$t']}`
                                out += `</td>`;

                                out += '<td>';
                                out += `${data[2][ss]['$t']}`
                                out += '</td>';
                                out += '<td>';

                                out += `${data[i][ss]['$t']}`;
                                out += `</td>`;


                                out += `</tr>`;
                            //}
                        }


                        out += `</table>`;
                    }
                }
            }
            console.log(out);
        }
    }

    // document.onclick = function (e) {
    //
    //     if (e.target.attributes.name.nodeValue=="add-to-card") {
    //         if (e) {
    //             console.log(e);
    //             console.log(e.target.attributes);
    //             console.log(e.target.attributes.idtovar.value);
    //         }
    //     }
    // }
})