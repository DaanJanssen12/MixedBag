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
function buildPokemonBlock(pokemon){

}
$(document).ready(function(){
    readTextFile("data/pokedex-full.json", function(text){
        var data = JSON.parse(text);
        var $container = $("#pokedex");

        data.forEach(pokemon => {
            var $infocard = $("<div></div>").addClass("infocard");

            var $span = $("<span></span>").addClass("infocard-lg-img");
            var $a = $("<a></a>").attr("href", `index.html?page=pokedex&id=${pokemon.name.toLowerCase()}`);
            var $picture = $("<picture></picture>");
            var $img = $("<img></img>").addClass("img-fixed").attr("src", `data/pokemon/img/${pokemon.name.toLowerCase()}.png`);
            $img.appendTo($picture);
            $picture.appendTo($a);
            $a.appendTo($span);
            $span.appendTo($infocard);

            var $span2 = $("<span></span>").addClass("infocard-lg-data text-muted");
            var $a2 = $("<a></a>").addClass("ent-name").text(`#${pokemon.nr} ${pokemon.name}`);
            $a2.appendTo($span2);
            $span2.appendTo($infocard);

            $infocard.appendTo($container);
        });
    });
});