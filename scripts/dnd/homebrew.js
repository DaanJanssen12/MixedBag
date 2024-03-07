$(document).ready(function () {
    var $classesContainer = $("#classes-container");
    readTextFile("data/classes.json", (data) => {
        var classes = JSON.parse(data);
        var classCounter = 0;
        var iterationCounter = 0;
        while (classCounter < classes.length && iterationCounter < 20) {
            var $row = $("<div></div>").addClass("row");
            for (var i = 0; i < 3; i++) {
                var $class = buildClass(classes[classCounter]);
                $class.appendTo($row);
                classCounter++;

                if (classCounter >= classes.length) break;
            }
            $row.appendTo($classesContainer);

            iterationCounter++;
        }
    });

    var $spellsContainer = $("#spells-container");
    readTextFile("data/spells.json", (data) => {
        var spells = JSON.parse(data);
        var spellLevelCounter = 0;
        var iterationCounter = 0;
        
        while(spellLevelCounter < 10 && iterationCounter < 20){
            var $row = $("<div></div>").addClass("row");
            for(var i = 0; i < 3; i++){
                var hbSpells = spells.filter(f => f.lvl == spellLevelCounter && f.isHomebrew);
                $spellBlock = buildSpellBlock(hbSpells, spellLevelCounter);
                $spellBlock.appendTo($row);
                spellLevelCounter++;

                if(spellLevelCounter >= 10) break;
            }
            $row.appendTo($spellsContainer);
            iterationCounter++;
        }
    });
});

function buildSpellBlock(spells, lvl){
    var $div = $("<div></div>").addClass("col-sm-4");
    var $h6 = $("<h6></h6>");
    var $span = $("<span></span>").text(lvl == 0 ? "Cantrips" : `Level ${lvl}`);
    $span.appendTo($h6);
    $h6.appendTo($div);
    
    var $p = $("<p></p>");
    for(var x = 0; x < spells.length; x++){
        $p.append("• ");
            var $subClass = buildSpellBullet(spells[x]);
            var $br = $("</br>");
            $subClass.appendTo($p);
            $br.appendTo($p);
    }
    $p.appendTo($div);
    return $div;
}

function buildSpellBullet(spell) {
    var linkText = spell.id;
    if (spell.author) {
        linkText = `${linkText} (Author: ${spell.author})`;
    }
    var $a = $("<a></a>").attr("target", "_blank")
        .attr("href", spell.link).text(linkText);
    return $a;
}

function buildClass(_class) {
    var $div = $("<div></div>").addClass("col-sm-4");
    var $h6 = $("<h6></h6>");
    var $span = $("<span></span>").text(_class.id);
    $span.appendTo($h6);
    $h6.appendTo($div);

    var $p = $("<p></p>");
    for (var x = 0; x < _class.subclasses.length; x++) {
        var subClass = _class.subclasses[x];
        if (subClass.isHomebrew) {
            $p.append("• ");
            var $subClass = buildSubClassBullet(_class.subclasses[x]);
            var $br = $("</br>");
            $subClass.appendTo($p);
            $br.appendTo($p);
        }
        if (subClass.features) {
            var hbFeatures = subClass.features.filter(f => f.hasHomebrew);
            for (var y = 0; y < hbFeatures.length; y++) {
                buildFeatureBullets(hbFeatures[y], $p);
            }
        }
    }
    if (_class.features) {
        var hbClassFeatures = _class.features.filter(f => f.hasHomebrew);
        for (var y = 0; y < hbClassFeatures.length; y++) {
            buildFeatureBullets(hbClassFeatures[y], $p);
        }
    }
    $p.appendTo($div);
    return $div;
}

function buildSubClassBullet(subClass) {
    var linkText = subClass.id;
    if (subClass.author) {
        linkText = `${linkText} (Author: ${subClass.author})`;
    }
    var $a = $("<a></a>").attr("target", "_blank")
        .attr("href", subClass.link).text(linkText);
    return $a;
}

function buildFeatureBullets(feature, $p) {
    for (var z = 0; z < feature.options.length; z++) {
        var option = feature.options[z];

        var linkText = `${option.id} (${feature.id})`;
        if (option.author) {
            linkText = `${linkText} (Author: ${option.author})`;
        }
        var $a = $("<a></a>").attr("target", "_blank")
            .attr("href", option.link).text(linkText);

        $p.append("• ");
        $a.appendTo($p);
        var $br = $("</br>");
        $br.appendTo($p);
    }
}