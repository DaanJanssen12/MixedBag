function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
let fireOnce = 0;

$(document).ready(function(){
    if(fireOnce <= 0){
        fireOnce++;
        var id = $("#POKEMON_ID").val();
        var pokemon = 'data/pokemon/' + id + '.json';
        readTextFile(pokemon, function(text){
            var data = JSON.parse(text);
            console.log(data);
    
            var html = document.body.innerHTML;
            html = html.replace("$Name", data.name);
            html = html.replace("$PrimaryType", data.primaryType);
            html = html.replace("$PrimaryTypeLabel", data.primaryTypeLabel);

            document.body.innerHTML = html; 
        });
        $("#POKEMON_IMG").attr("src", "data/pokemon/img/salareen.png");
    }
});