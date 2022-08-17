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
function replaceAll(str, find, replace){
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getEffectivenessLabel(amount){
    switch(amount){
        case 0.25:
            return "¼";
        case 0.5:
            return "½";
        case 1:
            return "";
        default:
            return amount;
    }
}
function getStatRank(stat){
    if(stat <= 30){
        return 1;
    } else if (stat <= 60){
        return 2;
    } else if (stat <= 60){
        return 3;
    } else if (stat <= 90){
        return 4;
    } else if (stat <= 120){
        return 5;
    } else if (stat <= 150){
        return 6;
    } else {
        return 7;
    }
}
fireOnce = 0;

$(document).ready(function(){
    if(fireOnce <= 0){
        fireOnce++;
        var id = $("#POKEMON_ID").val();
        var pokemon = 'data/pokemon/' + id + '.json';
        readTextFile(pokemon, function(text){
            var data = JSON.parse(text);
    
            var html = document.body.innerHTML;
            
            html = replaceAll(html, "$Name", data.name);
            html = replaceAll(html, "$PrimaryTypeLower", data.primaryType.toLowerCase());
            html = replaceAll(html, "$PrimaryType", data.primaryType);
            html = replaceAll(html, "$Species", data.species);
            html = replaceAll(html, "$Height", data.height);
            html = replaceAll(html, "$Weight", data.weight);
            html = replaceAll(html, "$Abilities", data.abilities.replace(",", "</br>"));
            html = replaceAll(html, "$NormalTypeEffectivenessClass", (data.typeDefenceEffectiveness.normal * 100));
            html = replaceAll(html, "$NormalTypeEffectiveness", getEffectivenessLabel(data.typeDefenceEffectiveness.normal));

            html = replaceAll(html, "$FireTypeEffectivenessClass", (data.typeDefenceEffectiveness.fire * 100));
            html = replaceAll(html, "$FireTypeEffectiveness", getEffectivenessLabel(data.typeDefenceEffectiveness.fire));

            html = replaceAll(html, "$WaterTypeEffectivenessClass", (data.typeDefenceEffectiveness.water * 100));
            html = replaceAll(html, "$WaterTypeEffectiveness", getEffectivenessLabel(data.typeDefenceEffectiveness.water));

            html = replaceAll(html, "$ElectricTypeEffectivenessClass", (data.typeDefenceEffectiveness.electric * 100));
            html = replaceAll(html, "$ElectricTypeEffectiveness", getEffectivenessLabel(data.typeDefenceEffectiveness.electric));

            html = replaceAll(html, "$GrassTypeEffectivenessClass", (data.typeDefenceEffectiveness.grass * 100));
            html = replaceAll(html, "$GrassTypeEffectiveness", getEffectivenessLabel(data.typeDefenceEffectiveness.grass));

            html = replaceAll(html, "$AtkStat", data.stats.atk);

            document.body.innerHTML = html;
            var imgSrc = "data/pokemon/img/"+data.name+".png";
            $("#POKEMON_IMG").attr("src", imgSrc); 
            $("#AtkWidthBar")
                .width(((parseInt(data.stats.atk)/180) * 100) + "%")
                .addClass("barchart-rank-"+getStatRank(data.stats.atk));
        });
    }
});