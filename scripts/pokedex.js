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
function buildEvolutionChart(evolutions){
    var $container = $("#evolution-container");

    evolutions.forEach(evolution => {
        //Arrow
        if(evolution.lvl > 0){
            var $arrowSpan = $("<span></span>").addClass("infocard infocard-arrow");
            var $arrowI = $("<i></i>").addClass("icon-arrow icon-arrow-e");
            var $arrowSmall = $("<small></small>").text(`(Level ${evolution.lvl})`);

            $arrowI.appendTo($arrowSpan);
            $arrowSmall.appendTo($arrowSpan);
            $arrowSpan.appendTo($container);
        }
        //Pokemon
        var $infocard = $("<div></div>").addClass("infocard");

        var $span = $("<span></span>").addClass("infocard-lg-img");
        var $a = $("<a></a>").attr("href", `index.html?page=pokedex&id=${evolution.name.toLowerCase()}`);
        var $picture = $("<picture></picture>");
        var $img = $("<img></img>").addClass("img-fixed").attr("src", `data/pokemon/img/${evolution.name.toLowerCase()}.png`);
        $img.appendTo($picture);
        $picture.appendTo($a);
        $a.appendTo($span);
        $span.appendTo($infocard);

        var $span2 = $("<span></span>").addClass("infocard-lg-data text-muted");
        var $a2 = $("<a></a>").addClass("ent-name").text(evolution.name);
        $a2.appendTo($span2);
        $span2.appendTo($infocard);

        $infocard.appendTo($container);
    });
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
    } else if (stat <= 90){
        return 3;
    } else if (stat <= 120){
        return 4;
    } else if (stat <= 150){
        return 5;
    } else if (stat <= 180){
        return 6;
    } else {
        return 7;
    }
}
function buildStatsTable(table, stats){
    $("tbody", $(table)).append(createStatRow("HP", stats.hp));
    $("tbody", $(table)).append(createStatRow("Attack", stats.atk));
    $("tbody", $(table)).append(createStatRow("Defense", stats.def));
    $("tbody", $(table)).append(createStatRow("Sp.Atk", stats.spatk));
    $("tbody", $(table)).append(createStatRow("Sp.Def", stats.spdef));
    $("tbody", $(table)).append(createStatRow("Speed", stats.spd));
}
function buildMovesTable(table, moves){
    moves.forEach(move => {
        $("tbody", $(table)).append(createMoveRow(move));
    });
}
function createMoveRow(move){
    $tr = $("<tr></tr>");
    $td1 = $("<td></td>").addClass("cell-num").text(move.lvl);
    $td1.appendTo($tr);

    $td2 = $("<td></td>").addClass("cell-name");
    $td2a = $("<a></a>").addClass("ent-name").text(move.move);
    $td2a.appendTo($td2);
    $td2.appendTo($tr);

    $td3 = $("<td></td>").addClass("cell-icon");
    $td3a = $("<a></a>").addClass("type-icon").addClass(`type-${move.type.toLowerCase()}`).text(move.type);
    $td3a.appendTo($td3);
    $td3.appendTo($tr);

    $td4 = $("<td></td>").addClass("cell-icon text-center");
    $td4a = $("<img></img>").width(30).height(20).attr("src", `https://img.pokemondb.net/images/icons/move-${move.category.toLowerCase()}.png`);
    $td4a.appendTo($td4);
    $td4.appendTo($tr);

    $td5 = $("<td></td>").addClass("cell-num").text(move.power);
    $td5.appendTo($tr);

    $td6 = $("<td></td>").addClass("cell-num").text(move.accuracy);
    $td6.appendTo($tr);

    return $tr;
}
function createStatRow(label, stat){
    $tr = $("<tr></tr>");
    $th = $("<th></th>").text(label);
    $td1 = $("<td></td>").addClass("cell-num").text(stat);
    $td2 = $("<td></td>").addClass("cell-barchart");
    $div = $("<div></div>")
        .addClass("barchart-bar")
        .addClass("barchart-rank-"+getStatRank(stat))
        .width(((parseInt(stat)/180) * 100) + "%");
    $div.appendTo($td2);
    $th.appendTo($tr);   
    $td1.appendTo($tr);   
    $td2.appendTo($tr);

    return $tr;
}

function getBaseStats(){
    let normal = 1; let fire = 1; let water = 1; let electric = 1; let grass = 1; let ice = 1; let fighting = 1; let poison = 1; let ground = 1; let sound = 1;
    let flying = 1; let psychic = 1; let bug = 1; let rock = 1; let ghost = 1; let dragon = 1; let dark = 1; let steel = 1; let fairy = 1; let light = 1;

    return {
        normal, fire, water, electric, grass, ice, fighting, poison, ground, sound, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy, light
    }
}

function calculateTypeDefenseStat(stats, type){
    switch(type){
        case "Normal":
            //Weaknesses
            stats.fighting *= 2;
            //Immunities
            stats.ghost *=0;
            break;
        case "Fighting":
            //Weaknesses
            stats.flying *= 2;
            stats.psychic *= 2;
            stats.fairy *= 2;
            //Resistances
            stats.rock /= 2;
            stats.bug /= 2;
            stats.dark /= 2;
            break;
        case "Flying":
            //Weaknesses
            stats.rock *= 2;
            stats.electric *= 2;
            stats.ice *= 2;
            //Resistances
            stats.fighting /= 2;
            stats.bug /= 2;
            stats.grass /= 2;
            //Immunities
            stats.ground *=0;
            break;
        case "Sound":
            //Weaknesses
            stats.light *= 2;
            stats.psychic *= 2;
            //Resistances
            stats.dragon /= 2;
            stats.ghost /= 2;
            break;
        case "Grass":
            //Weaknesses
            stats.flying *= 2;
            stats.poison *= 2;
            stats.bug *= 2;
            stats.fire *= 2;
            stats.ice *= 2;
            //Resistances
            stats.ground /= 2;
            stats.water /= 2;
            stats.grass /= 2;
            stats.electric /= 2;
            break;
        case "Fire":
            //Weaknesses
            stats.ground *= 2;
            stats.rock *= 2;
            stats.water *= 2;
            //Resistances
            stats.bug /= 2;
            stats.steel /= 2;
            stats.fire /= 2;
            stats.grass /= 2;
            stats.ice /= 2;
            stats.fairy /= 2;
            break;
        case "Water":
            //Weaknesses
            stats.grass *= 2;
            stats.electric *= 2;
            //Resistances
            stats.steel /= 2;
            stats.fire /= 2;
            stats.water /= 2;
            stats.ice /= 2;
            break;
        case "Dragon":
            //Weaknesses
            stats.ice *= 2;
            stats.dragon *= 2;
            stats.fairy *= 2;
            //Resistances
            stats.fire /= 2;
            stats.water /= 2;
            stats.grass /= 2;
            stats.electric /= 2;
            break;
    }
    return stats;
}

function calculateTypeDefenses(primaryType, secondaryType){
    var stats = getBaseStats();
    stats = calculateTypeDefenseStat(stats, primaryType);
    if(secondaryType !== ""){
        stats = calculateTypeDefenseStat(stats, secondaryType);
    }
    return stats;
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
            if(data.secondaryType === "")
            {
                html = replaceAll(html, "$SecondaryTypeLower", "hidden");
            }
            else
            {
                html = replaceAll(html, "$SecondaryTypeLower", data.secondaryType.toLowerCase());
                html = replaceAll(html, "$SecondaryType", data.secondaryType);
            }
            html = replaceAll(html, "$Species", data.species);
            html = replaceAll(html, "$Height", data.height);
            html = replaceAll(html, "$Weight", data.weight);
            html = replaceAll(html, "$CatchRate", data.catchRate);
            html = replaceAll(html, "$BaseExp", data.baseExp);
            html = replaceAll(html, "$BaseFriendship", data.baseFriendship);
            html = replaceAll(html, "$Abilities", data.abilities.replace(",", "</br>"));

            var stats = calculateTypeDefenses(data.primaryType, data.secondaryType);
            html = replaceAll(html, "$NormalTypeEffectivenessClass", (stats.normal * 100));
            html = replaceAll(html, "$NormalTypeEffectiveness", getEffectivenessLabel(stats.normal));

            html = replaceAll(html, "$FireTypeEffectivenessClass", (stats.fire * 100));
            html = replaceAll(html, "$FireTypeEffectiveness", getEffectivenessLabel(stats.fire));

            html = replaceAll(html, "$WaterTypeEffectivenessClass", (stats.water * 100));
            html = replaceAll(html, "$WaterTypeEffectiveness", getEffectivenessLabel(stats.water));

            html = replaceAll(html, "$ElectricTypeEffectivenessClass", (stats.electric * 100));
            html = replaceAll(html, "$ElectricTypeEffectiveness", getEffectivenessLabel(stats.electric));

            html = replaceAll(html, "$GrassTypeEffectivenessClass", (stats.grass * 100));
            html = replaceAll(html, "$GrassTypeEffectiveness", getEffectivenessLabel(stats.grass));

            html = replaceAll(html, "$IceTypeEffectivenessClass", (stats.ice * 100));
            html = replaceAll(html, "$IceTypeEffectiveness", getEffectivenessLabel(stats.ice));

            html = replaceAll(html, "$FightingTypeEffectivenessClass", (stats.fighting * 100));
            html = replaceAll(html, "$FightingTypeEffectiveness", getEffectivenessLabel(stats.fighting));

            html = replaceAll(html, "$PoisonTypeEffectivenessClass", (stats.poison * 100));
            html = replaceAll(html, "$PoisonTypeEffectiveness", getEffectivenessLabel(stats.poison));

            html = replaceAll(html, "$GroundTypeEffectivenessClass", (stats.ground * 100));
            html = replaceAll(html, "$GroundTypeEffectiveness", getEffectivenessLabel(stats.ground));

            html = replaceAll(html, "$SoundTypeEffectivenessClass", (stats.sound * 100));
            html = replaceAll(html, "$SoundTypeEffectiveness", getEffectivenessLabel(stats.sound));
            
            
            html = replaceAll(html, "$FlyingTypeEffectivenessClass", (stats.flying * 100));
            html = replaceAll(html, "$FlyingTypeEffectiveness", getEffectivenessLabel(stats.flying));

            html = replaceAll(html, "$PsychicTypeEffectivenessClass", (stats.psychic * 100));
            html = replaceAll(html, "$PsychicTypeEffectiveness", getEffectivenessLabel(stats.psychic));

            html = replaceAll(html, "$BugTypeEffectivenessClass", (stats.bug * 100));
            html = replaceAll(html, "$BugTypeEffectiveness", getEffectivenessLabel(stats.bug));

            html = replaceAll(html, "$RockTypeEffectivenessClass", (stats.rock * 100));
            html = replaceAll(html, "$RockTypeEffectiveness", getEffectivenessLabel(stats.rock));

            html = replaceAll(html, "$GhostTypeEffectivenessClass", (stats.ghost * 100));
            html = replaceAll(html, "$GhostTypeEffectiveness", getEffectivenessLabel(stats.ghost));

            html = replaceAll(html, "$DragonTypeEffectivenessClass", (stats.dragon * 100));
            html = replaceAll(html, "$DragonTypeEffectiveness", getEffectivenessLabel(stats.dragon));

            html = replaceAll(html, "$DarkTypeEffectivenessClass", (stats.dark * 100));
            html = replaceAll(html, "$DarkTypeEffectiveness", getEffectivenessLabel(stats.dark));

            html = replaceAll(html, "$SteelTypeEffectivenessClass", (stats.steel * 100));
            html = replaceAll(html, "$SteelTypeEffectiveness", getEffectivenessLabel(stats.steel));

            html = replaceAll(html, "$FairyTypeEffectivenessClass", (stats.fairy * 100));
            html = replaceAll(html, "$FairyTypeEffectiveness", getEffectivenessLabel(stats.fairy));

            html = replaceAll(html, "$LightTypeEffectivenessClass", (stats.light * 100));
            html = replaceAll(html, "$LightTypeEffectiveness", getEffectivenessLabel(stats.light));

            html = replaceAll(html, "$StatTotal", (data.stats.hp + data.stats.atk + data.stats.def + data.stats.spatk + data.stats.spdef + data.stats.spd));

            document.body.innerHTML = html;
            var imgSrc = "data/pokemon/img/"+data.name+".png";
            $("#POKEMON_IMG").attr("src", imgSrc); 
            buildStatsTable("#StatsTable", data.stats);
            buildMovesTable("#moves-table", data.moves);
            buildEvolutionChart(data.evolutions);
            $(".type-hidden").hide();
        });
    }
});