/*###########################
 
Coletando postagens
 
#############################*/
 
var ajax = new XMLHttpRequest();
 
// Seta tipo de requisição e URL com os parâmetros
ajax.open("GET", "dados.json", true);
 
// Envia a requisição
ajax.send();
 
// Cria um evento para receber o retorno.
ajax.onreadystatechange = function() {
 
    // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
    if (ajax.readyState == 4 && ajax.status == 200) {
 
        // Retorno do Ajax
        var data = ajax.responseText;

        console.log(data)
 
        var data_json = JSON.parse(data);
 
 
        if(data_json.length == 0){
            document.getElementsByClassName('card_loading')[0].style.display = 'none';
            document.getElementsByClassName('card_empty')[0].style.display = 'block';
        }else {
 
            document.getElementsByClassName('card_loading')[0].style.display = 'none';
 
            var container_viagens = document.getElementById('card_content');
 
            container_viagens.innerHTML = "";
 
            var html_viagens = "";
            for (var i = 0; i < data_json.length; i++) {
 
                html_viagens += template_card(data_json[i]['nome'],data_json[i]['url'],data_json[i]['dia'],data_json[i]['mes']);
 
            }
 
            container_viagens.innerHTML = html_viagens;
 
            cache_cards(data_json);
        }
    }
}
 
 
var template_card = function(cidade,url,dia,mes){
 
    return '<div class="planned-trips__card">\n' +
    '                        <div class="planned-trip__image">\n' +
    '                            <img src="'+url+'" alt="imagem da viagem" />\n' +
    '                        </div>\n' +
    '                        <div class="planned-trip__description">\n' +
    '                            <span>'+cidade+'</span>\n' +
    '                            <div class="pinned-trip__itenary">\n' +
    '                                <span>7</span><span>Dias</span>\n' +
    '                                <span>56 <i class="fa fa-camera-retro"></i></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="planned-trip__date">\n' +
    '                            <span>'+dia+'</span>\n' +
    '                            <span>'+mes+'</span>\n' +
    '                        </div>\n' +
    '                    </div>';
}



/*###########################
 
Armazenamento Off-line dos Cards carregados
 
#############################*/
 
 
var cache_cards = function(data_json){
 
    if('caches' in window) {
 
        caches.delete('card-cache').then(function () {
 
            console.log('Cache dos Cards deletado com sucesso!');
 
 
            if (data_json.length > 0) {
 
                var arquivos = ['dados.json'];
 
                for (var i = 0; i < data_json.length; i++) {
 
                    arquivos.push(data_json[i]['url']);
 
                }
 
                console.log("Arquivos a serem gravados em cache:");
                console.log(arquivos);
 
                caches.open('card-cache').then(function (cache) {
                    cache.addAll(arquivos)
                        .then(function () {
                            console.log("Arquivos cacheados com sucesso!");
                        });
                });
 
            }
 
        });
 
    }
}