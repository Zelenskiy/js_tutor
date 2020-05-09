$(document).ready(function () {
    // var table10  = "https://spreadsheets.google.com/feeds/list/1rEpRctv3dPRS3lZQpQZD4Xu8FSiKpB6RXGlA4S8i_Ys/od6/public/values?alt=json";
    var table11p = "https://spreadsheets.google.com/feeds/list/1zxh2DQaxdCPwq7CGmvdxRvbOdwl6Zwj5q93SHlvVhfY/od6/public/values?alt=json";
    // var table11a = "https://spreadsheets.google.com/feeds/list/19MlXf5lbEaNC7fCp5DZTu8deYz8fIR9G5IkmU8gW6q8/od6/public/values?alt=json";

    // $.getJSON(table10,
    //     function (data) {
    //         data = data['feed']['entry'];
    //         showRate(data);
    //     });
    $.getJSON(table11p,
        function (data) {
            data = data['feed']['entry'];
            showRate(data);
        });
    // $.getJSON(table11a,
    //     function (data) {
    //         data = data['feed']['entry'];
    //         showRate(data);
    //     });

    function showRate(data) {
        var form_count = 35;
        var re = /[0-9]/;
        for (var i = 1; i < data.length; i++) {
            var out = '';
            if (data[i]['gsx$num']['$t'].match(re)) {
                var student = data[i]['gsx$student']['$t'];
                console.log(student);

                if (data[i]['gsx$show']['$t'] != 0) {
                    if (true) {
                        var s = `${data[i]['gsx$num']['$t']}`;
                        out += `${data[i]['gsx$student']['$t']}` + '\n';
                        out += `${data[0]['gsx$student']['$t']}` + '\n\n';
                        out += 'Дата\t';
                        out += 'Оцінка\t';
                        out += '\n';
                        for (var j = 1; j <= form_count; j++) {
                            var ss = 'gsx$d' + j;
                            if (data[0][ss]['$t']!='') {
                                out += `${data[0][ss]['$t']}` + '\t';
                                out += `${data[i][ss]['$t']}` + '\t';
                                out += `${data[1][ss]['$t']}` + '\n';
                            }
                        }

                        out +='\n';
                        out += `${data[i]['gsx$email']['$t']}` + '\n\n\'';
                    }
                }
            }
            console.log(out);
            sleep(1000);
            $.ajax({
                    url: "./php_mail/mail.php",
                    type: "POST",
                    cache: false,
                    async:false,
                    data: {to: data[i]['gsx$email']['$t'],
                           message: out,
                           subject : "Оцінки "+ data[0]['gsx$student']['$t']
                    },
                    error: function () {
                        console.log("Щось не те для ");
                    },
                    success: function () {
                        console.log("Все OK для ");

                    }
                }
            );


        }
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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